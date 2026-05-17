const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username is already taken"]
    },
    email:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username is already taken"]
    },
    password:{
        type:String,
        required:[true,"Password can't be empty"],

    }
})

// userSchema.pre("save",function(next){})
// userSchema.post("save",function(next){})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel