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

console.log("files page is working");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";
var ObjectID = require("mongodb").ObjectID;

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Getting all files"
//   });
// });

// router.post("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Handling POST request"
//   });
// });

//Getting Files by Order ID
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  // console.log(id);
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    dbo
      .collection("files")
      .find({ orderId: id })
      .toArray(function(err, filesInOrder) {
        if (err) throw err;
        // console.log(filesInOrder.length);
        db.close();
        res.send(filesInOrder);
      });
  });
});

//Updating File by _id
router.patch("/:_id", (req, res, next) => {
  const _id = req.params._id;
  const body = req.body;
  console.log("_ID", body._id);
  console.log("Body", body);

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");

    dbo.collection("files").updateOne(
      { fileId: body.fileId },
      {
        $set: {
          color: body.color,
          colorLabel: body.colorLabel,
          density: body.density,
          densityLabel: body.densityLabel,
          densityMultiplier: body.densityMultiplier,
          itemTotal: body.itemTotal,
          material: body.material,
          materialLabel: body.materialLabel,
          materialPrice: body.materialPrice,
          process: body.process,
          processLabel: body.processLabel,
          quality: body.quality,
          qualityLabel: body.qualityLabel,
          qualityMultiplier: body.qualityMultiplier,
          quantity: body.quantity
        }
      },
      function(err, res) {
        if (err) throw err;
        // console.log("File Updated", res);
        db.close();
      }
    );
  });
  res.status(200).json({
    message: "Updating File " + _id
  });
});


module.exports = router;
