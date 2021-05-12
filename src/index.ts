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
