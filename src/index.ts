import express from "express";
import { userRouter } from "./user.router";

const bp = require("body-parser");

const app: express.Application = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
});
connection.connect((err: any) => {
  if (err) throw err;
  console.log("Connected!");
});
