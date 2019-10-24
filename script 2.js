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


//app.post("/", function(req, res){

  //console.log(req.body.fiat);

var fiat = req.body.fiat;
var baseURL ="https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC";

var fullURL = "";

if (fiat == "USDC"){
  fullURL = "https://apiv2.bitcoinaverage.com/indices/crypto/ticker/BTCUSDC";
}

else{
  fullURL = baseURL + fiat;
}

  request(fullURL, function(error, response, body){
      var data = JSON.parse(body);
      var lastPrice = data.last;

      res.send("<h1>The current price of bitcoin is " + lastPrice + fiat + "</h1>");
  });
});



app.listen(3000, function(){
  console.log("Server started on port 3000");
});
