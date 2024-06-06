const addToCartModel = require("../../models/cartProduct");

const updateAddToCardProduct = async (req, res) => {
    try {
        const addToCardProductId = req.body._id;
        const qty = req.body.quantity;
        console.log("qty", qty);
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCardProductId },
            { quantity: qty }
        );
        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true,
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports =updateAddToCardProduct
