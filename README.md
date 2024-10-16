> Last time changes : 18/10/2024

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
  - [Configuration of Dockerfile](#configuration-of-dockerfile)
  - [Configuration of Docker Compose](#configuration-of-docker-compose)
    - [Docker Compose YAML structure](#docker-compose-yaml-structure)
    - [Why use Docker Compose instead of Dockerfile alone?](#why-use-docker-compose-instead-of-dockerfile-alone-)
    - [Why use both Dockerfile and Docker Compose?](#why-use-both-dockerfile-and-docker-compose-)
    - [Complete example](#complete-example)
    - [Conclusion](#conclusion)
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

It already exists a simple command like `apt-get install docker.io` to install Docker, but this command is deprecated. So, if you are an older version of docker, here is a command to uninstall Docker and all plugins of Docker : 

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

![Uninstall Docker](./img/uninstall_docker.gif)

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

To test if Docker is correctly installed, you can run the following command:

```bash
docker run hello-world
```

If there are no errors and the Docker image 'hello-world' starts downloading and running, Docker is installed correctly. Otherwise, Docker is not installed on your machine.

#### In Windows

It is simple to install Docker on Windows using Docker Desktop, but first, make sure your system meets the requirements.

If you have an old version of Docker, uninstall it first. Here's the official uninstallation guide: [Uninstall Docker Desktop](https://docs.docker.com/desktop/uninstall/)

To install the latest version of Docker Desktop on Windows:
1. Download Docker Desktop from the [official Docker website](https://docs.docker.com/desktop/install/windows-install/)
2. Run the installer and follow the on-screen instructions
3. Ensure WSL 2 is enabled as the backend by following the instructions during setup.

Onece Docker Desktop is installed, verify it by running the following command in Powershell :

```powershell
docker run hello-world
```

If the "hello-world" image runs successfully, Docker is correctly installed on your system. Otherwise, troubleshoot using Docker's documentation.

### Configuration of Dockerfile

The **Dockerfile** is essentially a blueprint for creating Docker images, and here's a more detailed breakdown of its configuration:

1. **FROM**: Specifies the base image to use.
```dockerfile
FROM node:20-alpine 
```
2. **RUN**: Executes commands in the container during image creation (e.g., installing dependencies).
```dockerfile
RUN apk update && apk add openssh
```
3. **WORKDIR**: Sets the working directory for subsequent commands.
```dockerfile
WORKDIR /app
```
4. **COPY & ADD**: Copies files from the host to the container.
```dockerfile
COPY package*.json ./
ADD ./src /app
```
5. **EXPOSE**: Opens a port for your container to communicate
```dockerfile
EXPOSE 3000
```
6. **ENV**: Defines environment variables.
```dockerfile
ENV NODE_ENV=production
```
7. **CMD**: Sets the default command to run when the container starts.
```dockerfile
CMD ["node", "app.js]
```
8. **ENTRYPOINT**: Similar to `CMD`, but locks the main process. Often used for script or commands.
```dockerfile
ENTRYPOINT ["node", "app.js"]
```
9. **LABEL**: Add metadata like author or version.
```dockerfile
LABEL = maintainer="yourname@example.com"
```

Complete Example Dockerfile: 

```dockerfile
FROM node:20-alpine
LABEL maintainer="yourname@example.com"

WORKDIR /app
COPY package*.json ./
RUN npm install

ADD . /app

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["node", "app.js]
```

### Configuration of Docker Compose

Docker Compose is a tool used for defining and running multi-container Docker applications. It uses a YAML file to define services, networks, volumes, and more for container orchestration.

#### Docker Compose YAML structure

A `compose.yaml` file typically includes:

1. **services**: Defines the containers (each service runs in its own container).
```yaml
services:
  web:
    image: 'nginx:latest'
```
2. **build**: Specifies the build context and Dockerfile.
```yaml
services:
  web:
    build:
      context: ./njs-app1
      dockerfile: Dockerfile
```
3. **image**: Uses an existing image from Docker Hub or a registry.
```yaml
services:
  db:
    image: postgres:latest
```
4. **ports**: Maps host machine ports to container ports.
```yaml
services:
  web:
    ports:
      - "3001:3000"
```
5. **volumes**: Mounts local directories or volumes to containers.
```yaml
services:
  web:
    volumes:
      - ./data:/var/www
```
6. **networks**: Configures network settings for communication between containers.
```yaml
networks:
  default:
    external:
      name: my-network
```
7. **environment**: Sets environment variables for services.
```yaml
services:
  db:
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
```
8. **depends_on**: Specifies dependencies between services (start order).
```yaml
services:
  app:
    depends_on:
      - db
```
9. **healthcheck**: Configure a health check for the service.
```yaml
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 1m30s
      tiemout: 10s
      retries: 3
```

#### Why use Docker Compose instead of Dockerfile alone ?

- **Orchestration**: Docker Compose allows you to manage multiple containers simultaneously, handling networking, storage, and dependencies between containers.
- **Simplifies Setup**: Instead of manually starting each container, Compose automates the entire process with one command: docker-compose up.
- **Service Coordination**: With options like depends_on, Docker Compose ensures that dependent services start in the right order, something Dockerfiles alone cannot manage.

#### Why use both Dockerfile and Docker Compose ?
1. **Dockerfile**: Defines how a single container environment should be built (e.g., installing dependencies, setting up application environments).
2. **Docker Compose**: Orchestrates multiple services, networks, and volumes, defining how containers interact with one another.

Using both allows flexibility in defining how containers are built (Dockerfile) and how they are orchestrated together in a full-stack application (Docker Compose).

#### Complete Example
Here's a `compose.yaml` file with multiple services:
```yaml
services:
  web:
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - db
  
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - db_data:/var/lib/postgresql/data
  
volumes:
  db_data:
```

In this example:
- The `web` service is built from a Dockerfile
- The `db` service uses a PostgreSQL image from Docker Hub
- Both services are orchestrated and networked together.

#### Conclusion

Docker Compose simplifies multi-container applications by orchestrating services, networks, and sotrage. While Dockerfile is essential for building containers, Docker Compose is crucial for coordinating how those containers work together in more complex applications.

## Usage
To use Docker Compose for your multi-container application, follow these steps:

1. **Build and start containers:**

```bash
docker-compose up --build
```

This will build the Docker images defined in your `compose.yaml` file and start the services.

2. **Stop and remove containers:**
```bash
docker-compose down
```
This command stops and removes all containers and networks created by Docker Compose.

3. **Running in detached mode**: To run containers in the background:

```bash
docker-compose up -d
```

## Contributing
To contribute to this project:

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
```bash
git clone https://github.com/your-username/project-name.git
```
3. **Create a new branch** for your changes:
```bash
git checkout -b my-feature-branch
```
4. **Make your changes** and commit them:
```bash
git commit -m "Add new feature"
```
5. **Push the changes** to your fork:
```bash
git push origin my-feature-branch
```
6. **Submit a Pull Request** with a description of your changes.