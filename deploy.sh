#!/bin/bash
script_dir=$(dirname $0)

ansible-playbook "$script_dir/deploy/deploy.yml"