FROM debian:jessie

WORKDIR /openlmis-layout-ui

COPY package.json .
COPY bower.json .
COPY config.json .
COPY src/ ./src/
