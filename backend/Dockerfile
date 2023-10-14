# Dockerfile
FROM node:16-alpine

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

# We set the environment variable DEBUG to express:* to enable debug logging
# ENV DEBUG=express:*

ENTRYPOINT  [ "node", "index.js" ]