const tus = require("tus-node-server");
const fs = require("fs");
const path = require("path");
var cors = require('cors');
const server = new tus.Server();
const storageFolder = path.join(process.cwd(), "/uploads");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/files";
var dateFormat = require("dateformat");
const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());

const NodeStl = require("node-stl");

function createMongoEntry(
  orderId,
  timeStamp,
  newName,
  oldName,
  filetype,
  fileExtension,
  volume,
  dimensions,
  weight
) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    var dbo = db.db("files");
    dbo.collection("files").insertOne({
      fileId: newName,
      fileName: oldName,
      fileExtension: fileExtension,
      filetype: filetype,
      timeStamp: timeStamp,
      orderId: orderId,
      volume: volume,
      dimensions: dimensions,
      weight: weight
    });
  });
}

// app.get("/order", function(req, res) {
//   console.log("orderID", orderId);
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("files");
//     var query = { orderId: orderId };
//     dbo
//       .collection("files")
//       .find(query)
//       .toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//       });
//   });
//   res.send("Hello World!");
// });

// function fetchOrder(orderId) {
//   console.log("orderID", orderId);
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("files");
//     var query = { orderId: orderId };
//     dbo
//       .collection("files")
//       .find(query)
//       .toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//       });
//   });
// }

server.datastore = new tus.FileStore({
  // path: `/${storageFolder}`
  path: '/uploads'
});

const metadataStringToObject = stringValue => {
  const keyValuePairList = stringValue.split(",");

  return keyValuePairList.reduce((metadata, keyValuePair) => {
    let [key, base64Value] = keyValuePair.split(" ");
    metadata[key] = new Buffer.from(base64Value, "base64").toString("ascii");

    return metadata;
  }, {});
};

server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, event => {
  const oldPath = `${storageFolder}/${event.file.id}`;
  const metaData = metadataStringToObject(event.file.upload_metadata)
  //   Extract File Extension
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(metaData.filename)[1];

  //   Convert to Upper case for consistency (STl, stl, Stl => STL)
  var fileExtension = ext.toUpperCase();

  const orderId = metaData.orderId;
  const filetype = metaData.filetype;

  //   Rename File to Original File along with a timestamp, to avoid replacement of duplicates in the uploads folder
  const oldName = metaData.filename;
  var now = Date.now();
  const newName = `${now}_${oldName}`;
  const newPath = `${storageFolder}/${newName}`;
  const timeStamp = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  //   console.log(timeStamp);

  fs.rename(oldPath, newPath, err => {
    // handle error in here
    if (err == null) {
      console.log(oldName, " Uploaded");

      //   if file is STL, pass it through node-stl & get stl properties
      if (fileExtension == "STL") {
        var stl = new NodeStl(newPath, { density: 1 });
        var volume = stl.volume;
        var dimensions = stl.boundingBox;
        var weight = stl.weight;
      } else {
        // var stl = "NA";
        var volume = 0;
        var dimensions = [0, 0, 0];
        var weight = 0;
      }

      //   Create a (unique) Entry in MongoDB
      createMongoEntry(
        orderId,
        timeStamp,
        newName,
        oldName,
        filetype,
        fileExtension,
        volume,
        dimensions,
        weight
      );
    } else {
      console.log("Error");
      console.error(err);
    }
  });
});

const host = "localhost";
const port = 8000;
server.listen({ host, port }, () => {
  console.log(
    `[[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`
  );
});
