// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
  //console.log(req.body.fiat);

  request("https://apiv2.bitcoinaverage.com/indices/crypto/ticker/BTCUSDC", function(error, response, body){
      var data = JSON.parse(body);
      var lastPrice = data.last;

      res.send("<h1>The current price of BitCoin is </h1>" + lastPrice);
  });
});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
