const { Schema, model } = require("mongoose");

const QuizSchema = new Schema({
    subject:{
        type:String,
        required:true,
    },
   question:{
        type: String,
        required: true,},
    option: {
        option1:{
       type:String,
       required:true,
    },
    option2:{
        type:String,
        required:true,
    },
    option3:{
        type:String,
        required:true,
    },
    option4:{
    type:String,
    required:true,
    }
},
question2:{
    type:String,
    
},
});

const Quiz = model("quiz", QuizSchema);

module.exports = Quiz;
