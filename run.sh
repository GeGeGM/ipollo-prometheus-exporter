#!/bin/bash

docker run -p 9200:9200 -d --rm --mount type=bind,source="$(pwd)"/config.txt,target=/home/node/config.txt,readonly ipollo-prometheus-exporter