const mongoose=require("mongoose")
require("dotenv").config()

const connect=mongoose.connect(process.env.mongodb)
.then(()=>console.log("Database connected succesfully"))
.catch((error)=>console.log(error))
module.exports={connect}