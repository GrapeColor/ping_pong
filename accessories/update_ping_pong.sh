#!/bin/sh

sudo service ping_pong stop
echo "Ping Pong has stopped"

cd ~/bots/ping_pong

docker-compose down --rmi all

git pull origin master
docker-compose build --no-cache
docker-compose up --no-start

sudo service ping_pong start
echo "Ping Pong has started"
