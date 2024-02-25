#!/usr/bin/expect -f
set timeout 120
set host [lindex $argv 0]
set fe_image [fe_image $argv 1]
set be_image [be_image $argv 2]
set image_tag [image_tag $argv 3]
set branch_name [branch_name $argv 3]

send_user "host: $host\n"
spawn ssh -o StrictHostKeyChecking=no ubuntu@$host "git clone https://github.com/devops930-broadway/mern-ecommerce.git; cd mern-ecommerce;git checkout $branch_name; git pull; docker compose -e FE_IMAGE=$fe_image -e BE_IMAGE=$be_image -e IMAGE_TAG=$image_tag -f dockercompose_prod.yml up -d"
expect "ubuntu*\ password:"
send -- "changeme\r"
# sleep 5
# send -- "ls /\r"
# sleep 10
# send -- "exit\r"
expect eof


