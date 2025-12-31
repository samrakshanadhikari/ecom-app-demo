// Quick test script to verify MongoDB connection
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const testConnection = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        
        console.log("🔍 Checking environment variables...");
        console.log("MONGODB_URI exists:", !!uri);
        
        if (!uri) {
            console.error("❌ MONGODB_URI is not set!");
            console.error("Please add MONGODB_URI to your .env file or environment variables");
            process.exit(1);
        }

        // Mask password in URI for logging
        const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
        console.log("📝 Connection string format:", maskedUri.substring(0, 50) + "...");

        console.log("🔄 Attempting to connect to MongoDB...");
        await mongoose.connect(uri);
        
        console.log("✅ Successfully connected to MongoDB!");
        console.log("📊 Database name:", mongoose.connection.db.databaseName);
        console.log("🔌 Connection state:", mongoose.connection.readyState);
        
        // Test a simple query
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("📁 Collections found:", collections.length);
        if (collections.length > 0) {
            console.log("   Collections:", collections.map(c => c.name).join(", "));
        }
        
        await mongoose.disconnect();
        console.log("✅ Test completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed!");
        console.error("Error message:", error.message);
        
        if (error.message.includes("authentication failed")) {
            console.error("\n💡 Tip: Check your database username and password in the connection string");
        } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
            console.error("\n💡 Tip: Check if the MongoDB cluster hostname is correct");
        } else if (error.message.includes("timed out")) {
            console.error("\n💡 Tip: Check MongoDB Atlas Network Access - ensure 0.0.0.0/0 is whitelisted");
        } else if (error.message.includes("must be a string")) {
            console.error("\n💡 Tip: MONGODB_URI is not a valid string. Check your .env file format");
        }
        
        process.exit(1);
    }
};

testConnection();


