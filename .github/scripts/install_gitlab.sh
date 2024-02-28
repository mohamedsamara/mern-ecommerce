#!/bin/bash

echo "localhost" > hosts
sudo cp hosts /etc/ansible/hosts
cd ~
echo "-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAaAAAABNlY2RzYS
1zaGEyLW5pc3RwMjU2AAAACG5pc3RwMjU2AAAAQQQtE7rVb9VV3gd1HG33bT4GGhMNUEFK
o2O7OiIgTLTzCubM7GtSemauQm2IMwmnVq0PKzWgmGStRJknPgy8owG4AAAAoJ0rWPmdK1
j5AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBC0TutVv1VXeB3Uc
bfdtPgYaEw1QQUqjY7s6IiBMtPMK5szsa1J6Zq5CbYgzCadWrQ8rNaCYZK1EmSc+DLyjAb
gAAAAhAJLtiZB7zAKpmXUTGBpwzqeZ1C+Tml6+S4rWjHKop+GrAAAABGNpY2QBAgM=
-----END OPENSSH PRIVATE KEY-----" > /home/ubuntu/.ssh/id_ecdsa
chmod 400 /home/ubuntu/.ssh/id_ecdsa
echo "ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBC0TutVv1VXeB3UcbfdtPgYaEw1QQUqjY7s6IiBMtPMK5szsa1J6Zq5CbYgzCadWrQ8rNaCYZK1EmSc+DLyjAbg= cicd" > /home/ubuntu/.ssh/id_ecdsa.pub

cat /home/ubuntu/.ssh/id_ecdsa.pub > /home/ubuntu/.ssh/authorized_keys

## Create ansible project dir
#git checkout  Sarun-deploy
echo "yes" | ansible all -m ping
pwd
ansible-galaxy role install geerlingguy.gitlab
cd ~/mern-ecommerce/.github/Ansible
ansible-playbook main.yaml
