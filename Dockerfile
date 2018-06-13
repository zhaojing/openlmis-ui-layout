FROM debian:jessie

WORKDIR /openlmis-ui-layout

COPY package.json .
COPY bower.json .
COPY package-yarn.json .
COPY config.json .
COPY src/ ./src/
COPY build/messages/ ./messages/
