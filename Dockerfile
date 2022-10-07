# use docker node latest
FROM node:latest
# create a directory to run docker
WORKDIR /usr/local/docker/node_test

# copy all other files into the app directory
COPY . /usr/local/docker/node_test


CMD npm run start