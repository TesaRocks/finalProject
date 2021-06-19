import "reflect-metadata";
import express from "express";
import { userRouter } from "./routers/user.router";

const app: express.Application = express();

app.use("/api/user", [
  express.json(),
  express.urlencoded({ extended: false }),
  userRouter,
]);

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});
