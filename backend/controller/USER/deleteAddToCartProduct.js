const addToCartModel = require("../../models/cartProduct")


const deleteAddToCartProduct=async(req,res)=>{
    try{
        const addToCardProductId=req.body._id
        const currentUser=req.userId
        const deleteProduct=await addToCartModel.deleteOne({_id:addToCardProductId})
        res.json({
            message:"Product Delete From Cart",
            error:false,
            success:true,
            data:deleteProduct,
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
module.exports=deleteAddToCartProduct