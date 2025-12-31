import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

//define the role
export const Role={
    Admin :"admin",
    User : "user",
    Customer: "customer"
}

//
export const isAuthenticated = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        
        console.log("\n🔐 Authentication Check:");
        console.log("  - Has auth header?:", !!token);
        
        if (!token) {
            console.log("❌ No token found");
            return res.status(401).json({ message: "Token not found" });
        }
        
        // Remove 'Bearer ' prefix if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
            console.log("  - Removed Bearer prefix");
        }
        
        console.log("  - Token (first 20 chars):", token.substring(0, 20) + "...");
        console.log("  - JWT_SECRETE exists?:", !!process.env.JWT_SECRETE);
        
        // Verify token
        jwt.verify(token, process.env.JWT_SECRETE, async (err, decoded) => {
            if (err) {
                console.error("❌ Token verification failed:", err.name);
                console.error("  - Error message:", err.message);
                
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ 
                        message: "Token expired. Please login again.",
                        expired: true 
                    });
                }
                
                return res.status(403).json({ 
                    message: "Invalid token",
                    error: err.message 
                });
            }
            
            try {
                console.log("✅ Token verified for user ID:", decoded.id);
                const userData = await User.findById(decoded.id);
                
                if (!userData) {
                    console.log("❌ User not found for ID:", decoded.id);
                    return res.status(404).json({ message: "User not found" });
                }
                
                console.log("✅ User authenticated:", userData.username, "Role:", userData.role);
                req.user = userData;
                next();
            } catch (err) {
                console.error("❌ Error finding user:", err);
                res.status(500).json({ message: "Internal server error" })
            }
        });
    } catch (error) {
        console.error("❌ Authentication error:", error);
        res.status(500).json({ message: "Authentication error", error: error.message });
    }
}


//restrction based on the user/admin
export const restrictTo = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          message: "You don't have permission"
        });
      } else {
        next();
      }
    };
};

 