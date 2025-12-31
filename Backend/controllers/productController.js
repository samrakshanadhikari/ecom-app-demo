import Product from "../models/productModel.js"

//creat product api
export const createProduct = async (req, res) => {
    try {
        console.log("\n========================================");
        console.log("📥 PRODUCT CREATION REQUEST");
        console.log("========================================");
        console.log("  - User ID:", req.user?.id);
        console.log("  - Body:", JSON.stringify(req.body, null, 2));
        console.log("  - File present?:", !!req.file);
        if (req.file) {
            console.log("  - File details:", {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path
            });
        }
        console.log("========================================\n");
        
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;

        // Validate required fields
        if (!productName || !productDescription || !productPrice || !productTotalStockQuantity || !category) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        let productImageUrl;
        if (req.file) {
            productImageUrl = req.file.filename;
            console.log("✅ File uploaded:", productImageUrl);
        } else {
            console.log("⚠️ No file uploaded (this is okay)");
        }

        // Check for existing product (case-insensitive)
        const existingProducts = await Product.findOne({ 
            productName: { $regex: new RegExp(`^${productName}$`, "i") } 
        });
        
        if (existingProducts) {
            console.log("⚠️ Product already exists:", existingProducts.productName);
            return res.status(400).json({ message: "Product name must be unique" });
        }

        const products = await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStockQuantity,
            productImageUrl,
            totalRating: totalRating || undefined,
            category,
            userId
        });

        console.log("✅ Product created successfully:", products._id);
        res.status(200).json({ message: "Product created successfully", data: products });
    } catch (error) {
        console.error("❌ Product creation error:", error);
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
            message: "Error creating product", 
            error: error.message 
        });
    }
}

//fetch all products
export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ message: "Product fetch successfully", data: products })

}


//single product
export const fetchSingleProduct = async (req, res) => {
    const { id } = req.params;
    const products = await Product.findById(id);
    if (!products) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({ message: " Single product fetch successfull", data: products })
}

//update product
export const updateProduct = async (req, res) => {
    try {
        console.log("📥 Product update request received");
        console.log("  - Product ID:", req.params.id);
        console.log("  - Body:", req.body);
        console.log("  - File:", req.file ? req.file.filename : "none");
        
        const { id } = req.params;
        const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;
        
        let productImageUrl;
        if (req.file) {
            productImageUrl = req.file.filename;
            console.log("✅ New file uploaded:", productImageUrl);
        }

        const updateData = { 
            productName, 
            productDescription, 
            productPrice, 
            productTotalStockQuantity, 
            totalRating, 
            category 
        };
        
        // Only update image if a new one was provided
        if (productImageUrl) {
            updateData.productImageUrl = productImageUrl;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updatedProduct) {
            console.log("⚠️ Product not found:", id);
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("✅ Product updated successfully:", updatedProduct._id);
        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("❌ Product update error:", error);
        console.error("  - Error message:", error.message);
        
        res.status(500).json({ 
            message: "Error updating product", 
            error: error.message 
        });
    }
}

//delete product
export const deleteProduct= async(req, res)=>{
    const{id}=req.params;
    const products= await Product.findByIdAndDelete(id);
    if(!products){
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({ message: "Product deleted successfully"})

}

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Decode URL-encoded category name
    const decodedCategory = decodeURIComponent(category);
    console.log("🔍 Searching for category:", decodedCategory);

    // Try exact match first (case-insensitive)
    let products = await Product.find({ 
      category: { $regex: new RegExp(`^${decodedCategory}$`, "i") } 
    });

    // If no exact match, try partial match (category name starts with the search term)
    // This handles cases where category names have timestamps appended
    if (products.length === 0) {
      console.log("⚠️ No exact match, trying partial match...");
      products = await Product.find({ 
        category: { $regex: new RegExp(`^${decodedCategory}`, "i") } 
      });
    }

    // If still no match, try reverse - search term starts with category
    // This handles cases where products have "TestCategory" but categories are "TestCategory_123"
    if (products.length === 0) {
      console.log("⚠️ No partial match, trying reverse match...");
      // Get all products and filter by checking if category name contains the search term
      const allProducts = await Product.find();
      products = allProducts.filter(product => {
        const productCategory = product.category || "";
        return productCategory.toLowerCase().includes(decodedCategory.toLowerCase()) ||
               decodedCategory.toLowerCase().includes(productCategory.toLowerCase());
      });
    }

    console.log(`✅ Found ${products.length} products for category: ${decodedCategory}`);

    if (products.length === 0) {
      return res.status(200).json({ 
        message: `No products found for category: ${decodedCategory}`, 
        data: [] 
      });
    }

    res.status(200).json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.error("❌ Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};
