const { Schema, model }=require("mongoose");
const {createHmac, randomBytes}=require("crypto");
const { createTokenForUser}= require("../service/authentication.js");
const mySchema= new Schema({
    fullName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    birthday:{
        type:String,
    },
    salt:{
        type:String,
    
    },
    password:{
        type:String,
        required:true,

    },
    gender:{
        type:String,
        
    },
    profileImageURL:{
        type:String,
        default:"/images/default.png",
    },

   
},{timestamps:true});

mySchema.pre("save",function (next){
    const user=this;
    if(!user.isModified("password")) return;

    const salt=randomBytes(16).toString();
    const hashedPassword= createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
    next();

});

mySchema.static("matchPasswordAndGenerateToken", async function(email,password){
   const user= await this.findOne({email});
if(!user) throw new Error("user not found");
const salt=user.salt;
const hashedPassword=user.password;

const userProvidedHash= createHmac("sha256",salt).update(password).digest("hex");

if(hashedPassword !== userProvidedHash)
throw new Error("incorrect Password");
const token = createTokenForUser(user);
return token;

});

const User=model("user",mySchema);

module.exports=User;