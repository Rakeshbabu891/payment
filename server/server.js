require("./tus-server.js");
// require("./tus-server-test.js");
const express = require("express");
const app = require('./app.js');
// const app = express();
      
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")))

const http = require("http");
// const app = require("./app.js");

const port = 5000;
const server = http.createServer(app);

server.listen(port);
console.log("port:",port);


