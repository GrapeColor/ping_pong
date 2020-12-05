FROM node:14

WORKDIR /discord_bots/ping_pong

COPY package*.json ./
RUN npm i

COPY . .

ENTRYPOINT [ "node", "src/index.js" ]
