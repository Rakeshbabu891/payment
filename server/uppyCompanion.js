var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var companion = require("@uppy/companion");

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: "some-secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("Welcome to Companion");
});

const options = {
  providerOptions: {
    google: {
      key: "your google key",
      secret: "your google secret"
    },
    instagram: {
      key: "your instagram key",
      secret: "your instagram secret"
    }
    // you can also add options for dropbox here
  },
  server: {
    host: "localhost:8000",
    protocol: "http"
  },
  filePath: "/uploads",
  secret: "some-secret",
  debug: true
};

app.use(companion.app(options));

// handle 404
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not Found" });
});

// handle server errors
app.use((err, req, res, next) => {
  console.error("\x1b[31m", err.stack, "\x1b[0m");
  res.status(err.status || 500).json({ message: err.message, error: err });
});

companion.socket(app.listen(8000), options);

console.log("Welcome to Companion!");
console.log(`Listening on http://0.0.0.0:${8000}`);
