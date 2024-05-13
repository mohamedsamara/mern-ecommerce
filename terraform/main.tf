locals {
  example           = "mern-ecs-terraform"
}

provider "aws" {
  region = "us-east-1"

  default_tags {
    tags = { example = local.example,
    Environment = "devlopment",
    Project = "devopslab" }
  }
}


module "ecr-repo" {
  source           = "./../modules/ecr"
  ecr_name         = var.ecr_name
  tags             = var.tags
  image_mutability = var.image_mutability

}

module "ecs_backend" {
  source = "../modules/ecs-backend"

}
module "documentdb_cluster" {
  source                          = "../modules/document-db"
  cluster_size                    = var.cluster_size
  master_username                 = var.master_username
  master_password                 = var.master_password
  instance_class                  = var.instance_class
  db_port                         = var.db_port
  apply_immediately               = var.apply_immediately
  retention_period                = var.retention_period
  preferred_backup_window         = var.preferred_backup_window
  cluster_parameters              = var.cluster_parameters
  cluster_family                  = var.cluster_family
  engine                          = var.engine
  engine_version                  = var.engine_version
}

module "cloudfront_s3_website_with_domain" {
  source                 = "../modules/terraform-aws-cloudfront-s3-website"
  tags                   = var.tags
  domain_name            = "devops630.example.com"
  cloudfront_min_ttl     = 10
  cloudfront_default_ttl = 1400
  cloudfront_max_ttl     = 86400
}





output "cloudfront_domain_name" {
  value = "https://${module.cloudfront_s3_website_with_domain.cloudfront_domain_name}"
}


output "username" {
  value     = var.master_username
  sensitive = true
}

output "password" {
  value     = module.documentdb_cluster.master_password
  sensitive = true
}

output "ecs_backend_url_alb" {
  value = module.ecs_backend.lb_url
}

output "docsdb_endpoint" {
  value = module.documentdb_cluster.endpoint
}

output "backend_ecr_registry_url" {
  value = module.ecr.ecr_registry_uri
}