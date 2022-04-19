//import express
const express = require("express");

const postRouter = require("../posts/posts-router");

//declare server
const server = express();

//initial server root route
server.get("/", (req, res) => {
  res.send(`
        <h1>Welcome To Our API</h1>
    `);
});

server.use("/api/posts", postRouter);

//export server module
module.exports = server;
