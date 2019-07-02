const express = require("express");
const app = express();
//const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/files", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo DB"))
  .catch(err => console.log("Could not connect", err));

app.options("*", cors());
app.set("port", process.env.PORT || 5000);
app.use(express.static("./"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

require("./apis/api")(app);

module.exports = app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
  console.log("Visit http://localhost:" + app.get("port"));
});
