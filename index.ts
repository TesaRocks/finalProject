const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello World</h1>");
});

app.listen(8008, () => {
  console.log("server is listening on port 8008");
});
