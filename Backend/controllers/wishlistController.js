import Wishlist from "../models/addToWishlistModel.js"
import Product from "../models/productModel.js"
import User from "../models/userModel.js";

export const addToWishList = async (req, res) => {
    const userId = req.user.id;  //
    
    const { productId } = req.body; //
    console.log("ProductId : ", productId)

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(400).json({ message: " Product not found" })
    }
    console.log("Product : ", product)

    let wishlist = await Wishlist.findOne({ userId });
    console.log("wishlist : ", wishlist)
    if (!wishlist) {
        wishlist = await Wishlist.create({ userId, products: productId })
    } else {
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({ message: " Product already in wishlist" })
        }
        wishlist.products.push(productId);
        await wishlist.save();
    }
    res.status(200).json({ message: "Product is successfully added on the wishlist" })
}


//get wishlist 
//remove from wishlist
