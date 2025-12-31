import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import Cart from './models/cartModel.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

console.log("\n" + "=".repeat(80));
console.log("🗑️  DATABASE CLEANUP SCRIPT");
console.log("=".repeat(80) + "\n");

async function cleanDatabase() {
    try {
        // Connect to MongoDB
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB\n");

        // Get counts before deletion
        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const cartCount = await Cart.countDocuments();

        console.log("📊 CURRENT DATABASE STATE:");
        console.log(`  - Products: ${productCount}`);
        console.log(`  - Categories: ${categoryCount}`);
        console.log(`  - Cart Items: ${cartCount}\n`);

        if (productCount === 0 && categoryCount === 0 && cartCount === 0) {
            console.log("✅ Database is already clean! Nothing to delete.\n");
            await mongoose.connection.close();
            return;
        }

        console.log("🗑️  DELETING DATA...\n");

        // Delete all products
        if (productCount > 0) {
            const deletedProducts = await Product.deleteMany({});
            console.log(`✅ Deleted ${deletedProducts.deletedCount} products`);
        } else {
            console.log("ℹ️  No products to delete");
        }

        // Delete all categories
        if (categoryCount > 0) {
            const deletedCategories = await Category.deleteMany({});
            console.log(`✅ Deleted ${deletedCategories.deletedCount} categories`);
        } else {
            console.log("ℹ️  No categories to delete");
        }

        // Delete all cart items
        if (cartCount > 0) {
            const deletedCarts = await Cart.deleteMany({});
            console.log(`✅ Deleted ${deletedCarts.deletedCount} cart items`);
        } else {
            console.log("ℹ️  No cart items to delete");
        }

        // Verify deletion
        const finalProductCount = await Product.countDocuments();
        const finalCategoryCount = await Category.countDocuments();
        const finalCartCount = await Cart.countDocuments();

        console.log("\n📊 FINAL DATABASE STATE:");
        console.log(`  - Products: ${finalProductCount}`);
        console.log(`  - Categories: ${finalCategoryCount}`);
        console.log(`  - Cart Items: ${finalCartCount}\n`);

        if (finalProductCount === 0 && finalCategoryCount === 0 && finalCartCount === 0) {
            console.log("✅ DATABASE CLEANED SUCCESSFULLY!\n");
        } else {
            console.log("⚠️  Some items may not have been deleted. Check manually.\n");
        }

        console.log("=".repeat(80));
        console.log("🎉 CLEANUP COMPLETE - Ready for fresh testing!");
        console.log("=".repeat(80) + "\n");

        // Close connection
        await mongoose.connection.close();
        console.log("🔌 MongoDB connection closed\n");

    } catch (error) {
        console.error("\n❌ ERROR during cleanup:");
        console.error(error);
        process.exit(1);
    }
}

// Run the cleanup
cleanDatabase().then(() => {
    console.log("✅ Script finished successfully");
    process.exit(0);
}).catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
});

