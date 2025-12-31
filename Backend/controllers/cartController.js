import mongoose from "mongoose";
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

//add to cart api
export const addToCart = async (req, res) => {
    try {
        console.log("\n========================================");
        console.log("🛒 ADD TO CART REQUEST");
        console.log("========================================");
        
        const  userId  = req.user.id;

        const { productId, quantity } = req.body;
        console.log("  - User ID:", userId);
        console.log("  - Product ID:", productId);
        console.log("  - Quantity:", quantity);

        if (!productId || !quantity) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ message: "ProductId and quantity are required" })
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log("❌ Invalid product ID");
            return res.status(400).json({ message: "Invalid productId" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            console.log("❌ Product not found");
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("✅ Product found:", product.productName);

        //save and create
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            console.log("  - Item already in cart, updating quantity");
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            console.log("  - Adding new item to cart");
            cartItem = new Cart({ userId, productId, quantity })
            await cartItem.save();
        }

        console.log("✅ Cart item saved:", cartItem._id);
        console.log("========================================\n");

        res.status(200).json({ message: "Product added to cart", data: cartItem })
    } catch (error) {
        console.error("❌ Error adding to cart:", error);
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
}

//get item from cart
export const getCartItem= async(req, res)=>{
    try {
        console.log("\n========================================");
        console.log("📦 FETCH CART ITEMS REQUEST");
        console.log("========================================");
        
        const userId=req.user.id;
        console.log("  - User ID:", userId);
        
        const cartData= await Cart.find({userId}).populate("productId");
        
        console.log("  - Cart items found:", cartData.length);
        console.log("  - Cart data:", JSON.stringify(cartData, null, 2));
        console.log("========================================\n");
        
        res.status(200).json({message : "Cart items fetched successfully", data:cartData});
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        res.status(500).json({message : "Error fetching cart", error: error.message});
    }
}

//update cart item
export const updateCartItem = async (req, res) => {
    const  userId  = req.user.id;  //optional chaining

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ message: "ProductId and the quantity must required" })
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid productId" });
    }

   const cartItem= await Cart.findOne({userId, productId});

   if(!cartItem){
     return res.status(400).json({message : "No cart item found"})
   }

   cartItem.quantity=quantity;
   await cartItem.save();

    res.status(200).json({ message: "Quantity is successfully update", data: cartItem })

}

//delete
export const deleteCartItem = async (req, res) => {
    const  userId  = req.user.id;  //optional chaining
    const { productId } = req.params;
    console.log("userId : ", userId);
    console.log("productId : ",productId);
    const deleteCartItem= await Cart.findOneAndDelete({userId, productId});
    if(!deleteCartItem){
        return res.status(404).json({message : "Cart items not found"})
    }
    res.status(200).json({ message: "Cart item deleted" })
}
