import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../dashboard/sidebar/Sidebar';
import { API, APIAuthenticated } from '../../../http';
import { IMAGE_BASE_URL } from '../../../config/api';

const EditProduct = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productTotalStockQuantity: '',
    totalRating: '',
    image: null, 
    category: '',
    existingImageUrl: ''  
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/api/product/singleProduct/${id}`);
        const product = response.data.data; 
        setProductData({
          productName: product.productName,
          productDescription: product.productDescription,
          productPrice: product.productPrice,
          productTotalStockQuantity: product.productTotalStockQuantity,
          totalRating: product.totalRating,
          image: null,
          category: product.category,
          existingImageUrl: product.productImageUrl, 
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all fields except existingImageUrl which is not needed for the update
    formData.append('productName', productData.productName);
    formData.append('productDescription', productData.productDescription);
    formData.append('productPrice', productData.productPrice);
    formData.append('productTotalStockQuantity', productData.productTotalStockQuantity);
    formData.append('totalRating', productData.totalRating);
    formData.append('category', productData.category);
    
    // Only append image if a new one was selected
    if (productData.image) {
      formData.append('image', productData.image);
      console.log("📤 Updating product with new image:", productData.image.name);
    } else {
      console.log("📤 Updating product without changing image");
    }

    try {
      const response = await APIAuthenticated.patch(`/api/product/update/${id}`, formData);
      console.log("✅ Product updated:", response.data);
      alert('Product updated successfully');
      navigate('/listProduct');
    } catch (error) {
      console.error('❌ Error updating product:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update product';
      alert(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <section className="flex flex-col flex-grow items-center justify-center px-6 py-12 bg-blue-50">
        <div className="w-full max-w-4xl bg-blue-100 rounded-lg shadow-md p-8 border border-blue-200">
          <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">Edit Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-lg text-gray-300">Upload New Image (optional)</p>
              <input
                onChange={handleChange}
                type="file"
                name="image"
                id="image"
                accept="image/*"
                hidden
              />
              <label htmlFor="image" className="cursor-pointer">
                <img
                  src={
                    productData.image
                      ? URL.createObjectURL(productData.image)
                      : `${IMAGE_BASE_URL}/${productData.existingImageUrl}`
                  }
                  alt="Product preview"
                  className="w-48 h-48 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  placeholder="Enter the product name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Enter the category"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="productPrice" className="block mb-2 text-sm font-medium text-gray-700">Product Price</label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleChange}
                  placeholder="Enter the product price"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="productTotalStockQuantity" className="block mb-2 text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  id="productTotalStockQuantity"
                  name="productTotalStockQuantity"
                  value={productData.productTotalStockQuantity}
                  onChange={handleChange}
                  placeholder="Enter the stock quantity"
                  required
                  min="0"
                  step="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="totalRating" className="block mb-2 text-sm font-medium text-gray-700">Total Rating</label>
                <input
                  type="number"
                  id="totalRating"
                  name="totalRating"
                  value={productData.totalRating}
                  onChange={handleChange}
                  placeholder="Enter the total rating"
                  required
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                />
              </div>

            </div>

            <div>
              <label htmlFor="productDescription" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={productData.productDescription}
                onChange={handleChange}
                placeholder="Enter the product description"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            >
              Update Product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProduct;
