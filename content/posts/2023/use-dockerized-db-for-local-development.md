---
title: Use dockerized DB for local development
date: 2023-02-25 11:09:19
tags: [docker, postgres, bash, mysql]
---

Working with local backend have many advantages, response time are fast, you can work offline and no one is messing with your data.

While usually it's a good idea to write `docker-compose.yml` file containing all infrastructure needed, sometimes I just need **some** database right now.

Of course installing each kind of database is a hussle (and they have different versions as well!). So lets's just use docker image to quickly spin up DB and remove it when it won't be needed anymore.

So let's not make it longer then it have to be:

### PostgreSQL

```bash
docker run -d \
 -p 5455:5432 \
 -e "POSTGRES_DB=database" \
 -e "POSTGRES_USER=postgres" \
 -e "POSTGRES_PASSWORD=postgrespwd" \
 --name custom-db-name postgres:latest
```

We are mapping default port `5432` to `5455` to avoid port conflits with other existing databases.

### MariaDB

```bash
docker run -d \
 -p 3315:3306 \
 -e "MARIADB_DATABASE=database" \
 -e "MARIADB_USER=mariadb" \
 -e "MARIADB_PASSWORD=mariadbpw" \
 -e "MARIADB_ROOT_PASSWORD=mariadbroot" \
 --name custom-db-name mariadb:latest
`
```

Similart to previous example we map port `3306` to `3315`.
