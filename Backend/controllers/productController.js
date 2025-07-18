import Product from "../models/productModel.js"
//creat product api
export const createProduct = async (req, res) => {
    const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;

    let productImageUrl;
    if (req.file) {
        productImageUrl = `${req.file.filename}`
    }

    const products = await Product.create({
        productName,
        productDescription,
        productPrice,
        productTotalStockQuantity,
        productImageUrl,
        totalRating,
        category
    })
    res.status(200).json({ message: "Product created successfully", data: products })
}