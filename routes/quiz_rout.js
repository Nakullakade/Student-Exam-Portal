const {Router}=require("express");
const router=Router();
const multer=require("multer");
const path=require("path");
const Quiz= require("../models/Questions.js");




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName=`${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
  });

  const upload= multer({storage:storage});

router.get("/quiz",(req,res)=>{
    return res.render("quiz",{
        user: req.user,
    })
});

router.get("/takeQuiz",(req,res)=>{
  return res.render("takeQuiz");
})

router.get("/test/:id", async (req,res)=>{
  const quiz = await Quiz.findById(req.params)
  

  return res.render("takeQuiz",{
    user:req.user,
    quiz,
  
  });

});
router.get("/takeQuiz", (req,res)=>{
  res.redirect("/result");
})

router.post("/quiz", async (req, res) => {
  const {subject,question,option1,option2,option3,option4,question2}=req.body;
const quiz= await
    Quiz.create({
        subject,
        question,
        option:{
        option1,
        option2,
        option3,
        option4,},
        question2,
        

    
});

console.log(quiz);
return res.render("takeQuiz",{quiz});
});



module.exports=router;