FROM node:22.13.1-slim

WORKDIR /home/node/app

COPY . .

USER node

EXPOSE 8080

CMD [ "tail", "-f", "/dev/null" ]