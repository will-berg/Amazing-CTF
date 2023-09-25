# Dockerfile
FROM node:18-alpine

# create destination directory
WORKDIR /app/backend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the backend files and install dependencies
COPY . /app/backend
RUN npm install

# We use port 5000 for the backend
EXPOSE 5000

ENTRYPOINT  [ "node", "index.js" ]