import User from "../models/userModel.js"; //from the model
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//User registration
export const userRegistration = async (req, res) => {
    try {
        console.log("📝 Registration request received:", { username: req.body.username, email: req.body.email, role: req.body.role });
        
        const { username, email, password, role } = req.body; 
        if (!username || !email || !password) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ message: "Username, email, password must required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("❌ Email already exists:", email);
            return res.status(400).json({ message: "Email is already registered!" })
        }

        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 14); // password hashing   
        
        console.log("💾 Creating user in database...");
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'customer' // Default to customer if not provided
        })
        
        console.log("✅ User created successfully:", newUser._id);
        res.status(200).json({ message: "User registered successfully", data: newUser })

    } catch (err) {
        console.error("❌ Registration error:", err);
        console.error("  - Error name:", err.name);
        console.error("  - Error message:", err.message);
        console.error("  - Error stack:", err.stack);
        res.status(500).json({ error: "Internal server error", message: err.message })

    }
}


//Login
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email, password must required" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const ismatch = await bcrypt.compare(password, existingUser.password);

        if (!ismatch) {
            return res.status(404).json({ message: "Password not matched" })
        }

        const payload = { id: existingUser.id, role: existingUser.role }
        
        if (!process.env.JWT_SECRETE) {
            console.error("❌ JWT_SECRETE is not defined in environment variables!");
            return res.status(500).json({ error: "Server configuration error: JWT_SECRETE missing" });
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRETE, { expiresIn: "1h" });
        
        res.status(200).json({ message: "User login successfull", token, data: existingUser })

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error", message: err.message })
    }
}

// get all the users
export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if(!user){
            res.status(400).json({ message: "User not found"});
        }
        res.status(200).json({ message: "Successfully get all the users", data: user });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}


//fetch single users
export const singleUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Id from the postman : ", id)
        const users = await User.findById(id);
        if(!users){
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Single user fetch successfully", data:users})
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}


//user profile
export const userProfile= async(req, res)=>{
    try{
        const id=req.user.id;
        const user= await User.findById(id);
        if(!user){
            return res.status(400).json({message: " User not found"})
        }
         res.status(200).json({ message: "User profile fetch successfully", data:user})
    }catch(err){
        res.status(500).json({ error: "Internal server error" });
    }
}


//update  userProfile
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {username } = req.body;
        if (!username ) {
            return res.status(400).json({ message: "Username must required" });
        }
        const existingUser = await User.findOne({ username });
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({ message: "User updated successfully", data: user })

    } catch (err) {
        res.status(500).json({ error: "Internal server error" });

    }
}

//delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
         if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully"})
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });

    }
}

