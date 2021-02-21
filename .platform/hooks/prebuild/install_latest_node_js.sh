#!/bin/sh

# Install Latest Node

# This script installs the latest Node 12.x alongside
# with the paired NPM release.

sudo yum remove -y nodejs npm

sudo rm -fr /var/cache/yum/*

sudo yum clean all

curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -

sudo yum install nodejs -y