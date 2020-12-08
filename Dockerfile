FROM node:14

WORKDIR /app/ping_pong

COPY package*.json ./
RUN npm ci

COPY . .

ENTRYPOINT [ "node", "src/index.js" ]
