let express = require('express');
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");
console.log('Hello World!');

app.use(bodyParser.urlencoded({ extended: false }));       

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});
     
process.env.MESSAGE_STYLE='uppercase';

app.get('/json', function(req, res){
// Variable assignment as object
var response = {
  "message": "Hello json"
};

if(process.env.MESSAGE_STYLE==='uppercase'){
  //Override message attribute value based on condition
  response.message = response.message.toUpperCase();  
}

return res.json(response);
});

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});


module.exports = app;

