provider "google" {
  credentials = file("gcp_accesskey.json")
  project     =  local.gcp_accesskey.project_id
  region      = "us-central1"
}

locals {
  gcp_accesskey = jsondecode(file("gcp_accesskey.json"))
}

variable "branch_name" {
  type = string
  
}

variable "server" {
  type = string
  default = "compute"
  
}



resource "google_compute_instance" "lab-machine" {
  name         = "gitlab-node-${var.branch_name}"
  machine_type = "custom-2-6400"

  zone         = "us-central1-a"

  metadata = {
    # ssh-keys = "cloud_user_p_59cf731f:${file("./aleo_test_gcp_rsa.pub")}"
    user-data = file("${path.module}/cloud-config.yaml")
  }


  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size = 50
    }
  }

  # metadata_startup_script = file("./startup.sh")
  metadata_startup_script = templatefile("${path.module}/startup.sh.tpl", { server = var.server })
  network_interface {
    network = "default"

    access_config {
      // Optional: Ephemeral IP
    }
  }
}

# Define the firewall rule to allow all incoming traffic
resource "google_compute_firewall" "lab_machine_firewall" {
  name    = "allow-all"
  network = "default"

  allow {
    protocol = "all"
  }

  source_ranges = ["0.0.0.0/0"]  # Allow traffic from any source (all IPs)
}


output "public_ip" {
  value = google_compute_instance.lab-machine.network_interface[0].access_config[0].nat_ip
}