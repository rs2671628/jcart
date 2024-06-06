const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try{
        const {email,password,name}=req.body;
        const user=await userModel.findOne({email})
        if(user){
            throw new Error("already existed")
        }
        if(!email){
            throw new Error("please provide email");
        }
        if(!password){
            throw new Error("please provide password");
        }
        if(!name){
            throw new Error("please provide name");
        }       
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        if(!hash){
            throw new Error("something is wrong")
        }
        const payload={
            ...req.body,
            role:"GENERAL",
            password:hash
        }
        const userData=new userModel(payload)
        const saveUser=userData.save()
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User Created Successfully!"

        })
    }
    catch(err){
        res.json(
            {
                message:err.message || err,
                error:true,
                success:false,
            }
        )
    }
}
module.exports=userSignUpController