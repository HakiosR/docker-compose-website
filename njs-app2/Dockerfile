FROM node:22-alpine
LABEL version="1.0"
LABEL maintainer="HakiosR"
LABEL description="Docker image for App2 website"
LABEL environment="recette"

# MaJ Container
RUN apk update && apk upgrade && apk add --no-cache bash build-base

WORKDIR /app

COPY package*.json ./
RUN npm install

# Add PM2 for my project
RUN npm install pm2 -g

COPY . .
EXPOSE 3000

CMD [ "pm2-runtime", "app.js" ]