import "reflect-metadata";
import express from "express";
import { userRouter } from "./routers/user.router";
import * as bp from "body-parser";

const app: express.Application = express();

app.use("/user", [bp.json(), bp.urlencoded({ extended: true }), userRouter]);

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});

// const errorHandler = (err: any, req: any, res: any, next: any) => {
//   res.status(401);
//   res.json({ error: err });
// };

// app.use(errorHandler);
