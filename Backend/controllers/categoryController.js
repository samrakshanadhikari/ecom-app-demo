import Category from "../models/categoryModel.js";

// Create category API with image upload
export const createCategory = async (req, res) => {
    try {
        console.log("📥 Category creation request received");
        console.log("  - User ID:", req.user?.id);
        console.log("  - Body:", req.body);
        console.log("  - File:", req.file ? req.file.filename : "none");
        
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { categoryName } = req.body;

        if (!categoryName || categoryName.trim() === "") {
            return res.status(400).json({ message: "Category name is required" });
        }

        let categoryImageUrl;
        if (req.file) {
            categoryImageUrl = req.file.filename;
            console.log("✅ File uploaded:", categoryImageUrl);
        } else {
            console.log("⚠️ No file uploaded (this is okay)");
        }

        // Check for existing category (case-insensitive)
        const existingCategory = await Category.findOne({ 
            categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") } 
        });
        
        if (existingCategory) {
            console.log("⚠️ Category already exists:", existingCategory.categoryName);
            return res.status(400).json({ message: "Category name must be unique" });
        }

        const category = await Category.create({
            categoryName: categoryName.trim(),
            categoryImageUrl, 
            userId
        });

        console.log("✅ Category created successfully:", category._id);
        res.status(200).json({ message: "Category created successfully", data: category });
    } catch (error) {
        console.error("❌ Category creation error:", error);
        console.error("  - Error name:", error.name);
        console.error("  - Error message:", error.message);
        console.error("  - Error stack:", error.stack);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation error", 
                error: error.message 
            });
        }
        
        res.status(500).json({ 
            message: "Error creating category", 
            error: error.message 
        });
    }
};



//fetch all category
export const getAllCategory = async (req, res) => {
    const category = await Category.find();
    res.status(200).json({ message: "Category fetch successfully", data: category })

}


//single product
export const fetchSingleCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json({ message: " Single product fetch successfull", data: category })
}

//update product
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(id, { categoryName }, { new: true })
    if (!updateCategory) {
        return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json({ message: "Category update successfully", data: updateCategory })
}

//delete product
export const deleteCategory= async(req, res)=>{
    const{id}=req.params;
    const category= await Category.findByIdAndDelete(id);
    if(!category){
        return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json({ message: "Category deleted successfully"})

}

//mongodb atlas login
//ani try to replace the local url to online