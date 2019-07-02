const express = require("express");
const router = express.Router();
var cors = require('cors');
var app =express();
var Razorpay = require("razorpay");






app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
  })


 



















var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";



module.exports = router;