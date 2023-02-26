//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

var items = ["Wash Cloths", "Iron Them"];


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");  // this line used to apply ejs in express file  

var today = new Date();

var options ={
  weekday:"long",
  year:"2-digit",
  month:"short"
}

var day = today.toLocaleDateString("en-US",options);

// var daylist = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

app.get("/", function(req, res){
  res.render("list",{Today:day, newListItems : items});



  // res.render("list",{Today:daylist[currentDay]})
});

app.post("/",function (req,res) {
  var item = req.body.new_item;
  items.push(item);
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});




