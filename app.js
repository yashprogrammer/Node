//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")

console.log(date());


var items = ["Wash Cloths", "Iron Them"];
var work_item = [];


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");  // this line used to apply ejs in express file  
app.use(express.static("public")); // explicitly telling express to use static file stored in publi folder




// var daylist = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

app.get("/", function(req, res){
  let day = date();

  res.render("list",{ListTitle:day, newListItems : items, postPath : ""});



  // res.render("list",{Today:daylist[currentDay]})
});


app.get("/work",function (req,res) {
  res.render("list",{ListTitle:"Work List",newListItems : work_item, postPath : "work"})
})

app.get("/about", function (req,res) {
  res.render("about");
})


// app.post("/work", function (req,res) {
//   var item = req.body.new_item;
//   work_item.push(item);
//   console.log(req.body);

//   res.redirect("/work");
// })

app.post("/",function (req,res) {
  var item = req.body.new_item;
  

  if (req.body.button === "Work") {
    work_item.push(item);
    res.redirect("/work");
    console.log("work");
  }
  else{
    items.push(item);
  console.log(req.body);
  res.redirect("/");
  }
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});




