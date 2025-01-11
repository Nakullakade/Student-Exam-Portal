const express=require("express");
const path= require("path");

const User=require("./models/user.js");

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/test-app").then(()=>{console.log("Mongo Connected !")});

const cookieParser= require("cookie-parser");

const {checkForAuthenticationCookie}=require("./middleware/auth.js");


const app=express();
const PORT=8010;

const userRoute=require("./routes/user_rout.js");
const quizRoute=require("./routes/quiz_rout.js");
const Blog = require("./models/Questions.js");

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(express.static(__dirname+"/views"));


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/signin",(req,res)=>{
    res.render("signin");
});
app.get("/quiz",(req,res)=>{
    res.render("quiz");
});
app.get("/takeQuiz",(req,res)=>{
    return res.render("takeQuiz");
  });

app.get("/contact",(req,res)=>{
    return res.render("contact");
  });

app.get("/FAQ",(req,res)=>{
    return res.render("FAQ");
  });

app.get("/dashboard",(req,res)=>{
    return res.render("dashboard");
  });

app.get("/test",(req,res)=>{
    return res.render("test");
  });

app.get("/result",(req,res)=>{
    return res.render("result");
  });


app.use(userRoute);
app.use(quizRoute);
app.listen(PORT,()=> console.log(`Server Started at port ${PORT}`));