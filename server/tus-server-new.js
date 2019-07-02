const tus = require("tus-node-server");
const fs = require("fs");
const path = require("path");
var cors = require('cors');
const server = new tus.Server();
const storageFolder = path.join(process.cwd(), "/File");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";
var dateFormat = require("dateformat");
const express = require("express");
const app = express();


app.use(cors());


server.datastore = new tus.FileStore({
  path: '/Files'
});

const host = "localhost";
const port = 8000;
server.listen({ host, port }, () => {
  console.log(
    `[[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`
  );
});
