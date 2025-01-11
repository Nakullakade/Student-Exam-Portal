const {Router}=require("express");
const router=Router();
const User=require("../models/user.js");


router.get("/signin",(req,res)=>{
    return res.render('signin');
});

router.get("/",(req,res)=>{
  return res.render('home');
});

router.get("/signup",(req,res)=>{
    return res.render('signup');
});



router.post("/signin", async (req,res)=>{
  const { email,password }=req.body;
 try{
  console.log(email,password);
  const token= await User.matchPasswordAndGenerateToken(email,password);

  return res.cookie('token',token).redirect("/");
 }
 catch(error){
  return res.render("signin",{
    error: "Incorrect Email or Password",
  });
 }


});

router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("signin");
});


router.post("/signup", async(req,res)=>{
  const {fullName,email,gender,password}=req.body;
 const user= await User.create({
    fullName,
    email,
    gender,
    password,
  });

  return res.redirect("/");
})
module.exports=router;
