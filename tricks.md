# Please have a look at the following tricks for successfully running the app:

## Execute **"npm start"** for loading the app using **"Nodemon"**

### If the port: 8008 is being unavailable please run the following command at terminal:

1. lsof -i tcp:8008
2. Identify the PID at port 8008
3. Execute **kill -9 "PID identified"**

# Mysql

## At terminal run the following command:

1. sudo docker-compose up (for downloading the latest version of Mysql and running a container)
2. sudo docker exec -it [container_name] bash -l (Replace [container_name] for getting into container bash)
3. Once you are inside your container, you can connect to your MySQL server: ** mysql -u user -p**
   where user is the user stated in **docker-compose.yml**
