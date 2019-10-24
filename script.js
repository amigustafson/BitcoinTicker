// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){

  //console.log(req.body.fiat);

var crypto = req.body.crypto;
var fiat = req.body.fiat;
var amount = req.body.amount;

var baseURL ="https://apiv2.bitcoinaverage.com/convert/global";

var options = {
  url : baseURL,
  method : "GET",
  qs : {
    from: crypto,
    to: fiat,
    amount: amount,
  }
};


  request(options, function(error, response, body){
    console.log(body);
      var data = JSON.parse(body);
      var lastPrice = data.price;
      console.log(lastPrice);

      var currentDate = data.time;

      res.write("<p>The current date is " + currentDate + ".</p>");
      res.write("<h1>" + amount + crypto + " is currently worth " + lastPrice + fiat + "</h1>");

      res.send();
  });


});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
