#!/bin/bash
script_dir=$(dirname $0)

cd "$script_dir/deploy"
ansible-playbook "deploy.yml"