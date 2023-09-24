# Dockerfile
FROM node:18-alpine

# create destination directory
WORKDIR /app/frontend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the frontend files and install dependencies
COPY . /app/frontend
RUN npm install
RUN npm run build

# We use port 3000 for the frontend
EXPOSE 3000
ENV PORT=3000

ENTRYPOINT  [ "node", ".output/server/index.mjs" ]