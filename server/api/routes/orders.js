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

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";
// var ObjectID = require("mongodb").ObjectID;

// router.get("/", (req, res, next) => {
//   res.status(200).json({
//     message: "Getting all files"
//   });
// });

//Add New Order
router.post("/", (req, res,next) => {
  console.log("inside post 1")
  const body = req.body;
  console.log("_ID", body._id);
  console.log("Body", body);

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("files");
    console.log("inside post 2");
    dbo.collection("orders").insert(
    {
      order_id:req.body.s_orderId,
    name:req.body.s_name,
    email:req.body.s_email,
    mobile:req.body.s_mobile,
    company:req.body.s_company,
    gst:req.body.s_gst,
    billing_address:req.body.s_billing_address,
    shipping_address:req.body.s_shipping_address,
    city:req.body.s_city,
    pin:req.body.s_pin,
    state:req.body.s_state,
    subTotal:req.body.s_subTotal,
    tax: req.body.s_tax,
    orderTotal: req.body.s_orderTotal,
    uploadLength:req.body.s_uploadLength
  },
      function(err, res) {
        if (err) throw err;
        
        db.close();
      }
    );
  });
  res.status(200).json({
    message: "Inserting orders in file db"
  });
});
module.exports = router;
