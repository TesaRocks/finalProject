import "reflect-metadata";
import express from "express";
import { userRouter } from "./routers/user.router";
import * as bp from "body-parser";
import { makeDb , IDb} from "./repositories/makeDb";
import { injectable, container } from "tsyringe";

const app: express.Application = express();

// const config = {
//   host: "127.0.0.1",
//   port: 3307,
//   user: "user",
//   password: "password",
//   database: "db",
// };


// const db = makeDb( config );

// container.registerInstance(IDb ,db);

app.use("/user", [bp.json(), bp.urlencoded({ extended: true }), userRouter]);

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});


