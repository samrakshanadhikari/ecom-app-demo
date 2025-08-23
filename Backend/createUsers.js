import User from "./models/userModel.js";
import connectDB from "./config/mongodb.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Function to create users
const createUsers = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
    } else {
      // Create admin user
      const adminPassword = await bcrypt.hash("adminpassword123", 14);
      const newAdmin = await User.create({
        username: "admin_user",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin"
      });
      console.log("Admin user created successfully:", newAdmin.username);
    }

    // Check if regular user already exists
    const existingUser = await User.findOne({ email: "user@example.com" });
    if (existingUser) {
      console.log("Regular user already exists!");
    } else {
      // Create regular user
      const userPassword = await bcrypt.hash("userpassword123", 14);
      const newUser = await User.create({
        username: "regular_user",
        email: "user@example.com",
        password: userPassword,
        role: "user"
      });
      console.log("Regular user created successfully:", newUser.username);
    }

    console.log("User creation process completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
};

// Run the function
createUsers();
