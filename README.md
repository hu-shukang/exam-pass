```shell
docker run --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=mydb \
  -e MYSQL_USER=hushukang \
  -e MYSQL_PASSWORD=12345 \
  -p 3306:3306 \
  -d mysql:latest

docker cp exam_pass.sql mysql-container:/exam_pass.sql

docker exec -i mysql-container mysql -u hushukang -p12345 mydb < exam_pass.sql


```