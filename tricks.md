# Please have a look at the following tricks for successfully running the app:
⋅⋅* Execute **npm start** for loading the app using **nodemon**
⋅⋅* If the port: 8008 is being unavailable please run the following command at terminal:
1. lsof -i tcp:8008
2. Identify the PID at port 8008
3. Execute **kill -9 "PID identified"**
