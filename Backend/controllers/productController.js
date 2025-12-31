import Product from "../models/productModel.js"

//creat product api
export const createProduct = async (req, res) => {
    const userId=req.user.id;
    const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;

    
    let productImageUrl;
    if (req.file) {
        productImageUrl = `${req.file.filename}`
    }

    const existingProducts= await Product.findOne({productName})
    if(existingProducts){
         res.status(400).json({ message: "Product name must be unique "})
    }

    const products = await Product.create({
        productName,
        productDescription,
        productPrice,
        productTotalStockQuantity,
        productImageUrl,
        totalRating,
        category,
        userId
    })
    res.status(200).json({ message: "Product created successfully", data: products })
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
    const { id } = req.params;
    const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;
    let productImageUrl;
    if (req.file) {
        productImageUrl = `${req.file.filename}`
    }

    const updateProduct = await Product.findByIdAndUpdate(id, { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category, productImageUrl }, { new: true })
    if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({ message: "Product update successfully", data: updateProduct })
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
