#!/bin/bash
set -e

docker build -t scala-play-app .

docker run -d -p 9000:9000 --rm --name scala-api-backend scala-play-app

echo "Waiting 60 seconds for server start..."
sleep 60

ngrok http http://127.0.0.1:9000
