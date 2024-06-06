const addToCartModel = require("../../models/cartProduct")

const addToCartController=async(req,res)=>{
    try{
        const {productId}=req?.body
        const currentUser=req.userId
        console.log("productId",productId)
        {/**PRODUCT AVAILABLE OR NOT */}
        const isProductAvailable=await addToCartModel.find({productId})
        console.log("isProductAvailable",isProductAvailable)
        if(isProductAvailable.length!=0){
            return res.json({
                message:"Already Exist in Add to Cart",
                success:false,
                error:true,
            })
        }
        else{
            const payload={
                productId:productId,
                quantity:1,
                userId:currentUser,
            }
            const newAddToCart=new addToCartModel(payload)
            const saveProduct=await newAddToCart.save()
            return res.json(
                {
                    message:"Product Added",
                    data:saveProduct,
                    error:false,
                    success:true,
                }
            )
        }


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
module.exports=addToCartController