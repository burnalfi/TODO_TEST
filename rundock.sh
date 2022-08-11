#!/bin/bash

docker run -it -e MYSQL_HOST=host.docker.internal -e MYSQL_PORT=3306 -e MYSQL_USER=root -e MYSQL_PASSWORD= -e MYSQL_DBNAME=todo4 -e API_URL=http://host.docker.internal:3030 -p 3030:3030 -d burnalfi/todo_test