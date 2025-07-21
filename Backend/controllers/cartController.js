import mongoose from "mongoose";
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

//add to cart api
export const addToCart = async (req, res) => {
    const  userId  = req.user.id;  //optional chaining

    const { productId, quantity } = req.body;
    console.log("ProductId : ", productId)
    console.log("userId : ", userId)

    if (!productId || !quantity) {
        return res.status(400).json({ message: "ProductId and the quantity must required" })
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
    }

    //save and create
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();

    } else {
        cartItem = new Cart({ userId, productId, quantity })
        await cartItem.save();
    }

    res.status(200).json({ message: "Product is add on the cart", data: cartItem })

}

//get item from cart
//update
//delete