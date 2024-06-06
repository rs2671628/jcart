const mongoose=require("mongoose")
async function connectDB(){
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);      
        console.log("hihi")
    }catch(err){
        console.log(err)
    }
}
module.exports=connectDB