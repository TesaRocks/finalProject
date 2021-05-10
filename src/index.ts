import express = require("express");

const app: express.Application = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});
