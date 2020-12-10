#!/bin/sh

cd ~/bots/ping_pong

git pull origin master
echo "----------------------------------------------------------------"
docker-compose build --no-cache
echo "----------------------------------------------------------------"
echo "# Ping Pong has completed the update."

sudo service ping_pong stop
echo "# Ping Pong has stopped."
echo "----------------------------------------------------------------"

docker-compose up --no-start
echo "----------------------------------------------------------------"
echo "# Ping Pong has recreated the container."

sudo service ping_pong start
echo "# Ping Pong has restarted."
echo "----------------------------------------------------------------"

docker image prune -f
echo "----------------------------------------------------------------"
echo "# Removed an unused images of Docker."
