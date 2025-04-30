const mongoose=require("mongoose")

const Userschema =new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
   

})


const UserModel =mongoose.model("user",Userschema)

module.exports={UserModel}