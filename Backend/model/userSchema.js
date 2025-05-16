const mongoose = require("mongoose")
    const addressSchema = require("./addressModel")

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
        address:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Address"
        }


});


const UserModel = mongoose.model("user", Userschema)

module.exports = { UserModel }