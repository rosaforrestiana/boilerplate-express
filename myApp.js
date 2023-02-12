let express = require('express');
let app = express();
console.log('Hello World!');
app.get("/", function(req, res) {
  res.send("Hello Express");
});

//The Hello Express code is replaced with the code below
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});







































 module.exports = app;
