const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    
   res.sendFile(__dirname+"/index.html");



})

app.post("/",function (req,res) {


    
    var query = req.body.cityName;
    const apiKey = "9dcdab08d074417da7275023231402";
    var url ="https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+query;
    // res.send("Hello World!");
    https.get(url,function (response) {
        // console.log(response);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.current.temp_c;
            const weatherDes = weatherData.current.condition.text;
            const location = weatherData.location.name;
            console.log(temp);
            console.log(weatherDes);
            res.write("<h1>Weather of "+ location+ "</h1>");
            res.write("<h2>The Temperature is "+temp+"</h2>");
            res.write("<h3>Feels like "+weatherDes+"</h3>");
            res.send();
        })
    })
})

 

app.listen(3000, function () {
    console.log("Server started at 3000");
})