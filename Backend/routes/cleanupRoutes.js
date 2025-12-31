import { Router } from "express";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Cart from "../models/cartModel.js";
import { isAuthenticated, restrictTo, Role } from "../middleware/authMiddleware.js";

const router = Router();

// Clean all products, categories, and carts (ADMIN ONLY)
router.post("/cleanup-database", isAuthenticated, restrictTo(Role.Admin), async (req, res) => {
    try {
        console.log("\n" + "=".repeat(80));
        console.log("🗑️  DATABASE CLEANUP STARTED");
        console.log("=".repeat(80));
        console.log("  - Requested by:", req.user.username);
        console.log("  - User role:", req.user.role);

        // Get counts before deletion
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const cartCount = await Cart.countDocuments();

        console.log("\n📊 BEFORE CLEANUP:");
        console.log(`  - Products: ${productCount}`);
        console.log(`  - Categories: ${categoryCount}`);
        console.log(`  - Cart Items: ${cartCount}`);

        // Delete all
        const deletedProducts = await Product.deleteMany({});
        const deletedCategories = await Category.deleteMany({});
        const deletedCarts = await Cart.deleteMany({});

        console.log("\n🗑️  DELETION RESULTS:");
        console.log(`  ✅ Deleted ${deletedProducts.deletedCount} products`);
        console.log(`  ✅ Deleted ${deletedCategories.deletedCount} categories`);
        console.log(`  ✅ Deleted ${deletedCarts.deletedCount} cart items`);

        // Verify
        const finalProductCount = await Product.countDocuments();
        const finalCategoryCount = await Category.countDocuments();
        const finalCartCount = await Cart.countDocuments();

        console.log("\n📊 AFTER CLEANUP:");
        console.log(`  - Products: ${finalProductCount}`);
        console.log(`  - Categories: ${finalCategoryCount}`);
        console.log(`  - Cart Items: ${finalCartCount}`);
        console.log("\n✅ DATABASE CLEANUP COMPLETE!");
        console.log("=".repeat(80) + "\n");

        res.status(200).json({
            message: "Database cleaned successfully",
            deleted: {
                products: deletedProducts.deletedCount,
                categories: deletedCategories.deletedCount,
                cartItems: deletedCarts.deletedCount
            },
            current: {
                products: finalProductCount,
                categories: finalCategoryCount,
                cartItems: finalCartCount
            }
        });
    } catch (error) {
        console.error("❌ Cleanup error:", error);
        res.status(500).json({
            message: "Error cleaning database",
            error: error.message
        });
    }
});

export default router;

