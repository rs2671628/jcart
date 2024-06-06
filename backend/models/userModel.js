const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    Profilepic:{
        type:String
    },
    role:{
        type:String,
    }
},{
    timestamps:true
})
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;