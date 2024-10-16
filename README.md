# Automated and Orchestrated Container Deployment

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [What is Docker ?](#what-is-docker-)
- [Docker Compose](#docker-compose)
- [Dockerfile](#dockerfile)
- [Project Overview](#project-overview)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Description

I present my first DevOps project focused on Docker. This project, named "Automated and Orchestrated Container Deployment", involves creating a `docker-compose.yml` file to define and configure multiple containers. This allows for easy management and creation of new containers by adding code blocks with specific parameters. Each website folder contains a Dockerfile to set up a development environment, importing necessary Docker images (such as Node.js for Node applications) and performing required configurations. 

The goal of this project is to easily deploy websites in a secure and isolated environment, with each site having its own dependencies to minimize compatibility conflicts. I use Ubuntu server as the master server, [Docker](https://app.docker.com/) with [Docker Compose](https://docs.docker.com/compose/) to manage containers, [Node.js](https://nodejs.org/en) for my web applications, [Nginx](https://nginx.org/en/) to handle the reverse proxy and [Certbot](https://certbot.eff.org/) with [Let's Encrypt](https://letsencrypt.org/) to generate SSL certificates. This project simplifies the work of developers and IT administrators by facilitating deployment while ensuring the security fo the environments. It significantly saves time and improves reliability.

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
└──  README.md
```

## What is Docker ?

Before starting, I'll begin by defining Docker. Docker is containerization tool that allows applications to run in secure and isolated environments. It creates lightweight and consistent containers, that include all the necessary dependencies to run an application. This is particularly useful for developers and IT administrators, as it simplifies the management of development, test and production environments. Additionally, Docker facilitates automation for deployment and enables scalability in production with better portability.

## Docker Compose

Docker Compose is a tool that allows the definition and management of several containers in a multi-container environment. It uses a YAML file (`docker-compose.yml`) to describe the configuration of services, networks, volumes, and other necessary parameters to run several containers together. With a single command (`docker-compose up`), it is possible to create, run, and orchestrate these containers automatically. Docker Compose is particularly useful for developing and testing complex applications that require several interconnected services (such as a database, API, etc.).

## Dockerfile