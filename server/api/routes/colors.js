const express = require("express");
const router = express.Router();
var cors = require('cors');
var app =express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";

router.get("/", (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    dbo
      .collection("colors")
      .find({ enabled: true })
      .toArray(function(err, results) {
        if (err) throw err;
        console.log(results);
        db.close();
        res.send(results);
      });
  });
});

router.get("/:label", (req, res, next) => {
  const label = req.params.label;
  console.log(label);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    dbo
      .collection("colors")
      .find({ materialLabel: label })
      .toArray(function(err, results) {
        if (err) throw err;
        console.log(results.length);
        db.close();
        res.send(results);
      });
  });
});

module.exports = router;
