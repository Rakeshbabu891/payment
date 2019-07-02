const express = require("express");
const router = express.Router();
//const cors = require("cors");
var cors = require('cors');
var app =express();
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('process page is working');

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";

router.get("/", (req, res, next) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    dbo
      .collection("process")
      .find({ enabled: true })
      .toArray(function(err, processes) {
        if (err) throw err;
        console.log(processes);
        db.close();
        res.send(processes);
      });
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  console.log(id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    dbo
      .collection("files")
      .find({ orderId: id })
      .toArray(function(err, filesInOrder) {
        if (err) throw err;
        console.log(filesInOrder.length);
        db.close();
        res.send(filesInOrder);
      });
  });
});

router.patch("/:process", (req, res, next) => {
  res.status(200).json({
    message: "Updated Process"
  });
});

router.delete("/:process", (req, res, next) => {
  res.status(200).json({
    message: "Deleted Process"
  });
});

module.exports = router;
