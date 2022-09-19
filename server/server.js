
const path = require("path");
const express = require("express");
const app = express(); // create express app

// add middlewares
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.static("public"));

// start express server on port 5000
app.listen(5001, () => {
  console.log("server started on port 5001");
});