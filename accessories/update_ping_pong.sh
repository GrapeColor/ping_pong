#!/bin/sh

cd ~/bots/ping_pong

git pull origin master
echo "----------------------------------------------------------------"
docker-compose build --no-cache
echo "----------------------------------------------------------------"
docker-compose up --no-start
echo "----------------------------------------------------------------"
echo "Ping Pong has completed the update."

sudo service ping_pong stop
echo "Ping Pong has stopped."

sudo service ping_pong start
echo "Ping Pong has restarted."
echo "----------------------------------------------------------------"

docker system prune -fa --volumes
echo "----------------------------------------------------------------"
echo "Pruned unwanted Docker images and other data."
