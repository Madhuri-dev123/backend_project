var express = require("express");
var fs = require ("fs");
var app = express();
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false }));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/login.html");
})
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/login.html");
})
 app.get("/register",function(req,res){
    res.sendFile(__dirname+"/register.html");
})
app.post("/authenticate",function(req,res){
    var users = JSON.parse(fs.readFileSync('register.txt'));
    var filteredusers = users.filter(function(user){
        if(user.Emailaddress===req.body.Emailaddress && user.password === req.body.password){
            return true
        }
    })
    
    if(filteredusers.length!==0){
       var token = jwt.sign({Emailaddress:req.body.Emailaddress,password:req.body.password},"madhuri");
       res.cookie('token',token);
       res.sendFile(__dirname+"/workouts.ejs");
    }
    else{
        res.sendFile(__dirname+"/login.html");
    }})
app.post("/",function(req,res){
    var filteredusers=JSON.parse(fs.readFileSync('register.txt').toString())
    console.log(filteredusers)
    filteredusers.push(req.body)
    fs.writeFileSync("register.txt",JSON.stringify(filteredusers))
    res.sendFile(__dirname+'/login.html')
})

app.get("/dashbord",function(req,res){
    var logindata =JSON.parse(fs.readFileSync("workingdashbord.txt"))
    console.log(logindata)
    res.render("workouts",{works:logindata})
})

// app.get("/categories",function(req,res){{
//     var workoutcategories = JSON.parse(fs.readFileSync("workoutcategories.txt"))
//     res.render("workoutcategories",{categories:workoutcategories})
// }})






app.listen(4500,()=>console.log("running on 4500"));