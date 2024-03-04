data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_subnet" "default" {
  for_each = toset(data.aws_subnets.default.ids)
  id       = each.value
}

output "aws_vpc_id" {
  value = data.aws_vpc.default.id
}

data "aws_security_groups" "test" {

  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}


data "template_file" "user_data" {
  template = file("../scripts/user-data.sh")
}


data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/*20.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"]
}


# locals {
#   parsed_security_groups = split(" ", var.vpc_security_group_ids)
# }


resource "aws_instance" "mern-instance" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  subnet_id              = [for s in data.aws_subnet.default : s.id][0]
  vpc_security_group_ids = data.aws_security_groups.test.ids


  tags = {
    Name    = "mern-instance-user"
    Project = "devops"
  }

  user_data = data.template_file.user_data.rendered
}

output "public_ip" {
  value = aws_instance.mern-instance.public_ip
}
output "private_ip" {
  value = aws_instance.mern-instance.private_ip
}


output "aws_security_group" {
  value = data.aws_security_groups.test.ids
}

output "subnet_cidr_blocks" {
  value = [for s in data.aws_subnet.default : s.id]
}



