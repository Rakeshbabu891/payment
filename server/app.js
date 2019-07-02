const express = require("express");
const app =express();
// const app = require("server");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");


const fileRoutes = require("./api/routes/files");
const processRoutes = require("./api/routes/process");
const materialRoutes = require("./api/routes/materials");
const densityRoutes = require("./api/routes/density");
const qualityRoutes = require("./api/routes/quality");
const colorRoutes = require("./api/routes/colors");
const orderRoutes  = require("./api/routes/orders");
const userRoutes  = require("./api/routes/users");
const paymentRoutes = require("./api/routes/payment");

app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});







app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use("/files", fileRoutes);
app.use("/process", processRoutes);
app.use("/materials", materialRoutes);
app.use("/density", densityRoutes);
app.use("/quality", qualityRoutes);
app.use("/colors", colorRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use("/payment",paymentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});









//Updating File by _id





// console.log("this is from app.js at port number:",port)

module.exports = app;
