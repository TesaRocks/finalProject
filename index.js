"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.status(200).send("<h1>Hello World!!!! I am alexis Dietl</h1>");
});
app.listen(8008, function () {
    console.log("server is listening on port 8008");
});
