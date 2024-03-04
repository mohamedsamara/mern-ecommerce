#!/bin/bash

echo "Server: ${server}" >/tmp/hello.log

if [ -z "$service" ]; then
    echo "Usage: $0 <service>"
    echo "Please provide the service name: gitlab or jenkins"
    exit 1
fi

## Create Ansible project
cd ~
mkdir -p ansible_${server}/vars
echo "localhost" > ansible_${server}/hosts
cat > "ansible_${server}/$file_path" << EOF
---
- name: Install GitLab or Jenkins
  hosts: all
  become: true

  vars_files:
    - vars/main.yml

  vars:
    jenkins_hostname: jenkins.example.com
    java_packages:
      - openjdk-11-jdk

  roles:
    - name: Install Java
      when: server == 'jenkins'
      role: geerlingguy.java

    - name: Install Jenkins
      when: server == 'jenkins'
      role: geerlingguy.jenkins

    - name: Install GitLab
      when: server == 'gitlab'
      role: geerlingguy.gitlab
EOF

echo "YAML content has been written to $file_path"

case "$service" in
    gitlab)
        echo "Starting GitLab..."
        ansible-playbook -i inventory.yml playbook.yml -e "server=gitlab"
        
        ;;
    jenkins)
        echo "Starting Jenkins..."
        ansible-playbook -i inventory.yml playbook.yml -e "server=jenkins"
        ;;
    *)
        echo "Unknown service: $service"
        echo "Please provide either 'gitlab' or 'jenkins'"
        exit 1
        ;;
esac