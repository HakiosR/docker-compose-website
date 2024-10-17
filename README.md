> Last time changes : 17/10/2024

# Automated and Orchestrated Container Deployment

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [What is Docker ?](#what-is-docker-)
- [Docker Compose](#docker-compose)
- [Dockerfile](#dockerfile)
- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
  - [Choice of the environment](#choice-of-the-environment)
  - [Installation of Docker](#installation-of-docker)
    - [In Ubuntu](#in-ubuntu)
    - [In Windows](#in-windows)
- [Usage](#usage)
- [Contributing](#contributing)

## Description

I present my first DevOps project focused on Docker. This project, named "Automated and Orchestrated Container Deployment", involves creating a `docker-compose.yml` file to define and configure multiple containers. This allows for easy management and creation of new containers by adding code blocks with specific parameters. Each website folder contains a Dockerfile to set up a development environment, importing necessary Docker images (such as Node.js for Node applications) and performing required configurations. 

The goal of this project is to easily deploy websites in a secure and isolated environment, with each site having its own dependencies to minimize compatibility conflicts. I use Ubuntu server as the master server, [Docker](https://app.docker.com/) with [Docker Compose](https://docs.docker.com/compose/) to manage containers, [Node.js](https://nodejs.org/en) for my web applications, [Nginx Proxy Manager](https://nginxproxymanager.com/) to handle the reverse proxy and [Certbot](https://certbot.eff.org/) with [Let's Encrypt](https://letsencrypt.org/) to generate SSL certificates. This project simplifies the work of developers and IT administrators by facilitating deployment while ensuring the security fo the environments. It significantly saves time and improves reliability.

## Project Structure

```
/DOCKER-COMPOSE-WEBSITE/
|
├── njs-app1/ 
│ └── [all files and folders about my project like app.js, package*.json, ...]
│ └── Dockerfile
|
├── njs-app2/
│ └── [all files and folders about my project like app.js, package*.json, ...]
│ └── Dockerfile
|
├── njs-app3/
│ └── [all files and folders about my project like app.js, package*.json, ...]
│ └── Dockerfile
|
├── njs-appX/
│ └── [all files and folders about my project like app.js, package*.json, ...]
│ └── Dockerfile
|
├── docker-compose.yml
└── README.md
```

## What is Docker ?

Before starting, I'll begin by defining Docker. Docker is containerization tool that allows applications to run in secure and isolated environments. It creates lightweight and consistent containers, that include all the necessary dependencies to run an application. This is particularly useful for developers and IT administrators, as it simplifies the management of development, test and production environments. Additionally, Docker facilitates automation for deployment and enables scalability in production with better portability.

## Docker Compose

Docker Compose is a tool that allows the definition and management of several containers in a multi-container environment. It uses a YAML file (`docker-compose.yml`) to describe the configuration of services, networks, volumes, and other necessary parameters to run several containers together. With a single command (`docker-compose up`), it is possible to create, run, and orchestrate these containers automatically. Docker Compose is particularly useful for developing and testing complex applications that require several interconnected services (such as a database, API, etc.).

## Dockerfile

A Dockerfile is a text file containing a series of instructions used by Docker to automate the creation of a Docker image. It specifies how the image should be built by defining the layers that compose it. These instructions include actions such as:

- Installing dependencies
- Copying application files
- Configuring environment variables

A Dockerfile allows the creation of consistent development and production environments, facilitating the deployment of applications across different systems while ensuring that dependencies are correctly managed.

## Project Overview

This project aims to automate the deployment of multiple web applications using Docker and Docker Compose. It includes several Node.js applications, each isolated within its own container, ensuring that all dependencies are properly managed. The project uses the following technologies:

- Ubuntu Server 24.04 LTS as the host machine
- Docker to create and manage containers
  - Docker Compose to orchestrate multi-container environments
- Nginx Proxy Manager as a reverse proxy
- Certbot with Let's Encrypt for SSL certificates

This architecture enhances scalability, security, and development efficiency.

## Installation and Setup

### Choice of the environment

First, you'll choose which OS to use to be your master server. You can choice approximately all OS because Docker is compatible with Linux, Windows and MacOS. For my part, I chose Windows for my test environment and Ubuntu for my production environment.

> But, did you choose two environments ?

I chose two environments because I wanted to test all OS for my project. I wanted to test MacOS but it's to expensive for me.

In this documentation, I didn't take an installation step by step of Windows or Ubuntu, so here is two documentations for installing Ubuntu and Windows :

- [How install Ubuntu Server 24.04 LTS ?](https://www.linuxtechi.com/how-to-install-ubuntu-server/)
- [How to install Windows ?](https://www.asus.com/support/faq/1039507/)

### Installation of Docker

Now, you'll see how to install Docker on your environment. I can't see you an installation in MacOS, but here a documentation about this :

- [How to install Docker on macOS ?](https://medium.com/@supportfly/steps-for-installing-docker-on-mac-c9cb9ad06665)

#### In Ubuntu

It already exists a simple command like `apt-get install docker.io` to install Docker, but this command is deprecated. So, if you are an older version of docker, here is a command to uninstall Docker and all plugins of Docker : `for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done`.

After this, you'll start to install the new Docker version with those commands :

```bash
# Update & Upgrade your server
sudo apt-get update
sudo apt-get install ca-certificates

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Now, you can run this command and Docker will be installed in this latest version on your environment :

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```



#### In Windows

