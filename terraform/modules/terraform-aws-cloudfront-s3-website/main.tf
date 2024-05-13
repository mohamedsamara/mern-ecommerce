terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.46.0"
    }
  }
}


provider "aws" {
  region = "us-east-1"
  alias  = "aws_cloudfront"
}

locals {
  default_certs = var.use_default_domain ? ["default"] : []
  acm_certs     = var.use_default_domain ? [] : ["acm"]
  domain_name   = var.use_default_domain ? [] : [var.domain_name]
}


# Creating a Random String
resource "random_string" "random" {
  length  = 6
  special = false
  upper   = false
}

# Creating an S3 Bucket
resource "aws_s3_bucket" "s3_bucket" {
  bucket        = "mernfrontend-${random_string.random.result}"
  force_destroy = true
}

# Creating S3 bucket website configuration
resource "aws_s3_bucket_website_configuration" "mern_fe_bucket" {
  bucket = aws_s3_bucket.s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}


# Creating S3 bucket public access block
resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket                  = aws_s3_bucket.s3_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Adding Bucket Policy
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.s3_bucket.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.s3_bucket.id}/*"
    }
  ]
}
EOF
}

##### Inline HTML Content #####
data "template_file" "index_html" {
  template = <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This is the main page of my website.</p>
</body>
</html>
EOF
}

data "template_file" "error_html" {
  template = <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error Page</title>
</head>
<body>
  <h1>Error Page</h1>
  <p>Oops! Something went wrong. Please try again later.</p>
</body>
</html>
EOF
}


# Uploading HTML Files to S3 using aws_s3_object
resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.s3_bucket.id
  key          = "index.html"
  content      = data.template_file.index_html.rendered
  content_type = "text/html"
}

resource "aws_s3_object" "error_html" {
  bucket       = aws_s3_bucket.s3_bucket.id
  key          = "error.html"
  content      = data.template_file.error_html.rendered
  content_type = "text/html"
}



resource "aws_cloudfront_distribution" "s3_distribution" {
  depends_on = [
    aws_s3_bucket.s3_bucket
  ]

  origin {
    domain_name = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
    origin_id   = "s3-cloudfront"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"


  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = "s3-cloudfront"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"

    # https://stackoverflow.com/questions/67845341/cloudfront-s3-etag-possible-for-cloudfront-to-send-updated-s3-object-before-t
    min_ttl     = var.cloudfront_min_ttl
    default_ttl = var.cloudfront_default_ttl
    max_ttl     = var.cloudfront_max_ttl
  }

  price_class = var.price_class

  restrictions {
    geo_restriction {
      restriction_type = var.cloudfront_geo_restriction_restriction_type
      locations = []
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  wait_for_deployment = false
  tags                = var.tags
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-${var.domain_name}.s3.amazonaws.com"
}
