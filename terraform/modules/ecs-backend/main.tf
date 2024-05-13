# * Part 1 - Setup.
locals {
  fe_container_name = "mern-fe"
  be_container_name = "mern-be"
  fe_container_port = 8080 # ! Must be same port from our Dockerfile that we EXPOSE
  be_container_port = 3000
  example           = "mern-ecs-terraform"
}



# Retrieve the default VPC ID
data "aws_vpc" "default" {
  default = true
}

# Retrieve the default subnets
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Retrieve the default security group of the default VPC
data "aws_security_group" "default" {
  name   = "default"
  vpc_id = data.aws_vpc.default.id
}


data "aws_subnet" "default" {
  for_each = toset(data.aws_subnets.default.ids)
  id       = each.value
}


# Extract the subnet IDs as a list
locals {
  subnet_ids = values(data.aws_subnet.default)[*].id
}


# * Part 2 - Create application load balancer
module "alb" {
  source  = "terraform-aws-modules/alb/aws"

  load_balancer_type = "application"
  security_groups    = [data.aws_security_group.default.id]
  # subnets             = [data.aws_subnet.default.id]
  subnets = local.subnet_ids # Use the extracted subnet IDs list
  vpc_id  = data.aws_vpc.default.id

  security_group_rules = {
    ingress_all_http = {
      type        = "ingress"
      from_port   = 80
      to_port     = 80
      protocol    = "TCP"
      description = "HTTP web traffic"
      cidr_blocks = ["0.0.0.0/0"]
    }
    ingress_all_frontend = {
      type        = "ingress"
      from_port   = 8080
      to_port     = 8080
      protocol    = "TCP"
      description = "HTTP web traffic"
      cidr_blocks = ["0.0.0.0/0"]
    }
    egress_all = {
      type        = "egress"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  http_tcp_listeners = [
    {
      # ! Defaults to "forward" action for "target group"
      # ! at index = 0 in "the target_groups" input below.
      port               = 80
      protocol           = "HTTP"
      target_group_index = 0
    }
  ]

  target_groups = [
    {
      backend_port     = local.fe_container_port
      backend_protocol = "HTTP"
      target_type      = "ip"
    }
  ]
}

# * Step 5 - Create our ECS Cluster.
module "ecs" {
  source  = "terraform-aws-modules/ecs/aws"
  cluster_name = local.example

  # * Allocate 20% capacity to FARGATE and then split
  # * the remaining 80% capacity 50/50 between FARGATE
  # * and FARGATE_SPOT.
  fargate_capacity_providers = {
    FARGATE = {
      default_capacity_provider_strategy = {
        base   = 20
        weight = 50
      }
    }
    FARGATE_SPOT = {
      default_capacity_provider_strategy = {
        weight = 50
      }
    }
  }
}

# * Step 6 - Create our ECS Task Definition
data "aws_iam_policy_document" "this" {
  version = "2012-10-17"

  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      identifiers = ["ecs-tasks.amazonaws.com"]
      type        = "Service"
    }
  }
}
resource "aws_iam_role" "this" { assume_role_policy = data.aws_iam_policy_document.this.json }
resource "aws_iam_role_policy_attachment" "this" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role       = resource.aws_iam_role.this.name
}

resource "aws_ecs_task_definition" "td_frontend" {
  container_definitions = jsonencode([{
    environment : [
      { name = "MY_INPUT_ENV_VAR", value = "terraform-modified-env-var" }
    ],
    essential    = true,
    image        = "dpaktamang/mern-ecomerce-fe:54656f1",
    name         = local.fe_container_name,
    portMappings = [{ containerPort = local.fe_container_port }],
    log_configuration = {
      log_driver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/${local.example}/frontend" # Adjust log group name as needed
        "awslogs-region"        = "us-east-1"                      # Update with your region if different
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
  cpu                      = 256
  execution_role_arn       = resource.aws_iam_role.this.arn
  family                   = "family-of-${local.example}-tasks"
  memory                   = 512
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
}

# Step 6 - Create ECS Autoscaling Policy
resource "aws_appautoscaling_policy" "ecs_autoscale_policy" {
  name               = "${local.example}-ecs-autoscale-policy"
  service_namespace  = "ecs"
  scalable_dimension = "ecs:service:DesiredCount"
  resource_id        = "service/${module.ecs.cluster_name}/${aws_ecs_service.frontend.name}"
  policy_type        = "TargetTrackingScaling"

  target_tracking_scaling_policy_configuration {
    target_value = 70 # Target CPU utilization
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"

    }
  }
}

# Create ECS Scalable Target for Autoscaling
resource "aws_appautoscaling_target" "ecs_scalable_target" {
  max_capacity       = 3 # Maximum desired count for autoscaling
  min_capacity       = 1 # Minimum desired count for autoscaling
  resource_id        = "service/${module.ecs.cluster_name}/${aws_ecs_service.frontend.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}


# * Step 7 - Run our application.
resource "aws_ecs_service" "frontend" {
  cluster         = module.ecs.cluster_id
  desired_count   = 2
  launch_type     = "FARGATE"
  name            = "${local.example}-service"
  task_definition = resource.aws_ecs_task_definition.td_frontend.arn

  # depends_on = [aws_appautoscaling_target.ecs_scalable_target]  # Ensure scalable target is created first

  lifecycle {
    ignore_changes = [desired_count] # Allow external changes to happen without Terraform conflicts, particularly around auto-scaling.
  }

  load_balancer {
    container_name   = local.fe_container_name
    container_port   = local.fe_container_port
    target_group_arn = module.alb.target_group_arns[0]
  }

  network_configuration {
    security_groups  = [data.aws_security_group.default.id]
    subnets          = local.subnet_ids
    assign_public_ip = true
  }
}

# * Step 8 - See our application working.
# * Output the URL of our Application Load Balancer so that we can connect to
# * our application running inside  ECS once it is up and running.
output "lb_url" { value = "http://${module.alb.lb_dns_name}" }
# Output
# output "subnets_out" {
#   value = data.aws_subnet.default
# }

# output "subnet_cidr_blocks" {
#   value = [for s in data.aws_subnet.default : s.cidr_block]
# }

### References
### https://github.com/1Mill/example-terraform-ecs

