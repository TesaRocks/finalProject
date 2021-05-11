import express = require("express");
const bp = require('body-parser')

const app: express.Application = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
interface IUser {
  name: string;
}

const users: IUser[] = [];

app.get("/", (req, res) => {
  console.log(req.headers);
  res.status(200).json(req.headers);
});

app.post("/user", (req, res) => {  
  users.push(req.body);

  console.log(req);
  const obj = {
    status: "OK"
  }
  res.status(200).json(req.body);
});

app.get("/user", (req, res) => {
  res.status(200).json(users);
});

app.get("/user/:id", (req, res) => {
  res.status(200).json(users[0]);
});

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});
