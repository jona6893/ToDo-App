#!/bin/bash

# ANSI color codes
YELLOW="\033[0;33m"
NC="\033[0m"

# Change to the root directory of your project
cd "$(dirname "$0")"

# Function to display error and exit
error_exit() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

# Install npm dependencies for client
printf "${YELLOW}Installing npm dependencies for client...${NC}\n"
cd client || error_exit "Failed to navigate to client directory"
npm install || error_exit "Failed to install npm dependencies for client"
cd .. || error_exit "Failed to navigate back to root directory"

# Build Docker images from Dockerfiles
printf "${YELLOW}Building Docker images...${NC}\n"
docker build -t client_image -f client/Dockerfile client || error_exit "Failed to build client Docker image"
docker build -t server_image -f server/Dockerfile server || error_exit "Failed to build server Docker image"

# Change to the directory containing docker-compose.yml
printf "${YELLOW}Running Docker Compose...${NC}\n"
docker-compose up --abort-on-container-exit || error_exit "Docker Compose failed"

