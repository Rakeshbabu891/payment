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



router.post("/", (req, res,next) => {
  console.log("inside post 1")
  const body = req.body;
  console.log("_ID", body._id);
  console.log("Body", body);

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    console.log("inside post 2");
    dbo.collection("users").insert(
    {
    name:req.body.name,
    email:req.body.email,
    mobile:req.body.mobile,
    company:req.body.company,
    gst:req.body.gst,
    billing_address:req.body.billing_address,
    shipping_address:req.body.shipping_address,
    city:req.body.city,
    pin:req.body.pin,
    state:req.body.state
    },
      function(err, res) {
        if (err) throw err;
        
        db.close();
      }
    );
  });
  res.status(200).json({
    message: "Inserting users in file db"
  });
});

module.exports = router;
