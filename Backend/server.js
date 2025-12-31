import express from "express"
import connectDB from "./config/mongodb.js"; //import from the mongodb.js 
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import wishlistRoutes from "./routes/wishlistRoute.js"
import ratingReviewsRoutes from "./routes/ratingReviewRoutes.js"

import cors from "cors"

import dotenv from "dotenv"
dotenv.config();

console.log("🚀 Starting server...");
console.log("📝 Environment check:");
console.log("  - NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("  - PORT:", process.env.PORT || "3000 (default)");
console.log("  - MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ NOT SET");
console.log("  - JWT_SECRETE:", process.env.JWT_SECRETE ? "✅ Set" : "❌ NOT SET");

const app=express();
const PORT= process.env.PORT || 3000;

//
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("./storage"));

// Connect to database
console.log("🔄 Attempting to connect to MongoDB...");
connectDB().catch((error) => {
    console.error("❌ Failed to connect to MongoDB on startup:", error.message);
    console.error("⚠️ Server will continue but database operations will fail");
});

// Add a root route
app.get("/", (req, res) => {
    res.json({ 
        message: "E-commerce API is running!", 
        status: "success",
        endpoints: {
            users: "/api",
            products: "/api/product",
            categories: "/api/category",
            cart: "/api/cart",
            orders: "/api/order",
            wishlist: "/api/wishlist",
            reviews: "/api/ratingReview"
        }
    });
});

//Routes

app.use("/api", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/ratingReview", ratingReviewsRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running on  the port ${PORT}`)   
})
