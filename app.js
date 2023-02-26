//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");  // this line used to apply ejs in express file  

var today = new Date();
var currentDay = today.getDay();
var daylist = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

app.get("/", function(req, res){
  // res.send("Hello");



  res.render("list",{Today:daylist[currentDay]})
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
