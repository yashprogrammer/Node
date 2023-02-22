const express = require("express");
const https = require("node:https");
const bodyPareser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyPareser.urlencoded({extended:true})); // bodyparser is used to excess request from the page as a javascript object
app.use(express.static("public")); //by using this line server uses local files which are stored in public dir

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function (req,res) {
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data ={
        members:[{
            email_address : email,
            status:"subscribed",
            merge_field:{
                FNAME : firstName,
                LNAME:lastName
            }
        }]
    }

    var inputData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/201610d297";

    const option = {
        method : "POST",
        auth:"yash1:cb266831ad4b58e5d96b3c0a551962ef-us9"
    }

    const request = https.request(url,option,function (response) {

        console.log(response.statusCode);

        if (response.statusCode == 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
            
        }

        response.on("error",function (err) {
            console.log(err);
            res.sendFile(__dirname+"/failure.html");

        })


        response.on("data",function (data) {
            console.log(JSON.parse(data));
        })



    })

    request.write(inputData);
    request.end();

})


app.post("/failure", function (req,res) {
    res.redirect("/");
})

//listning to the server

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})



// cb266831ad4b58e5d96b3c0a551962ef-us9
// 201610d297   