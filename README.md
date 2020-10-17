
docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgres -d postgres  
docker run -p 4000:80 -e PGADMIN_DEFAULT_EMAIL=postgres -e PGADMIN_DEFAULT_PASSWORD=postgres -d dpage/pgadmin4
