const express=require('express')
const router=express.Router()
const userSignUpController=require("../controller/USER/userSignUp")
const userSignInController = require('../controller/USER/userSignIn')
const userControllerDetails = require('../controller/USER/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/USER/userLogout')
const allUsers = require('../controller/USER/allusers')
const updateUser = require('../controller/USER/updateUser')
const uploadProductController = require('../controller/PRODUCT/uploadProduct')
const getProductController = require('../controller/PRODUCT/getProduct')
const updateProductController = require('../controller/PRODUCT/updateProduct')
const getCategoryProduct = require('../controller/PRODUCT/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/PRODUCT/getCategoryWiseProduct')
const getProductDetails = require('../controller/PRODUCT/getProductDetails')
const addToCartController = require('../controller/USER/addToCartController')
const countAddToCardProduct = require('../controller/USER/countAddToCardProduct')
const addToCartViewProduct = require('../controller/USER/addToCartViewProduct')
const updateAddToCardProduct = require('../controller/USER/updateAddToCardProduct')
const deleteAddToCartProduct = require('../controller/USER/deleteAddToCartProduct')
const searchProduct = require('../controller/PRODUCT/searchProduct')
const filterProduct = require('../controller/PRODUCT/filterProduct')
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userControllerDetails)
router.get("/userLogout",userLogout)
//ADMIN PANEL
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)


//PRODUCT
router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProduct)

//USER ADD TO CART
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCardProduct",authToken,countAddToCardProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-card-product",authToken,updateAddToCardProduct)
router.post("/delete-card-product",authToken,deleteAddToCartProduct)



module.exports=router