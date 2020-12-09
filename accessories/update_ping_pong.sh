#!/bin/sh -x

sudo service ping_pong stop
echo "Ping Pong has stopped"
echo "----------------------------------------------------------------"

cd ~/bots/ping_pong

docker-compose down --rmi all
echo "----------------------------------------------------------------"

git pull origin master
echo "----------------------------------------------------------------"

docker-compose build --no-cache
echo "----------------------------------------------------------------"
docker-compose up --no-start
echo "----------------------------------------------------------------"

echo "Ping Pong has completed the update"

sudo service ping_pong start
echo "Ping Pong has started"
