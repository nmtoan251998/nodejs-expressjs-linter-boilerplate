FROM node:lts-slim

EXPOSE 5000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app

CMD ["npm", "start"]