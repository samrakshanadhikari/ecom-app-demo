import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        mongoose.connection.on("connected", ()=>{
            console.log("✅ Connected to the mongodb server");
        });
        
        mongoose.connection.on("error", (err)=>{
            console.error("❌ MongoDB connection error:", err.message);
        });

        mongoose.connection.on("disconnected", ()=>{
            console.log("⚠️ MongoDB disconnected");
        });
        
        // Check if MONGODB_URI exists
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        
        if (!uri) {
            console.error("❌ MONGODB_URI is not defined in environment variables!");
            console.error("Please add MONGODB_URI to your environment variables.");
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log("✅ MongoDB connection established successfully");
        console.log("📊 Database:", mongoose.connection.db.databaseName);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        console.error("\n🔍 Detailed error information:");
        console.error("   Error name:", error.name);
        console.error("   Error code:", error.code || "N/A");
        
        if (error.message.includes("authentication failed")) {
            console.error("\n💡 SOLUTION: Your MongoDB username or password is incorrect.");
            console.error("   → Go to MongoDB Atlas and re-copy the connection string");
            console.error("   → Make sure you replace <password> with your actual password");
        } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
            console.error("\n💡 SOLUTION: Cannot reach MongoDB cluster hostname.");
            console.error("   → Check if your connection string hostname is correct");
        } else if (error.message.includes("timed out") || error.code === "ETIMEDOUT") {
            console.error("\n💡 SOLUTION: MongoDB Atlas is blocking the connection.");
            console.error("   → Go to MongoDB Atlas → Network Access");
            console.error("   → Add IP Address: 0.0.0.0/0 (Allow Access from Anywhere)");
        } else if (!uri) {
            console.error("\n💡 SOLUTION: MONGODB_URI environment variable is missing.");
            console.error("   → Add MONGODB_URI to your Render Environment Variables");
        }
        
        console.error("\n⚠️ Server will continue running but database operations will fail");
        // Don't exit - let server start so user can see the error in logs
        throw error; // Re-throw so server.js can catch it
    }
}

export default connectDB