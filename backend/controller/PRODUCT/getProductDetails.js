const productModel = require("../../models/productModel")

const getProductDetails=async(req,res)=>{
 try{
   const {productId}=req.body
   const product=await productModel.findById(productId)
   res.json({
    data:product,
    message:"ok",
    error:false,
    success:true,
   })                             
 }
 catch(err){
    res.json(
        {
            message:err?.message || err,
            
        }
    )  
}
}
module.exports=getProductDetails