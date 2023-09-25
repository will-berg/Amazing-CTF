# Dockerfile
FROM node:18-alpine

# create destination directory
WORKDIR /app/hacking

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the frontend files and install dependencies
COPY . /app/hacking
RUN npm install
RUN npm run build

# We use port 4000 for the frontend
EXPOSE 4000
ENV PORT=4000

ENTRYPOINT  [ "node", ".output/server/index.mjs" ]