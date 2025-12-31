import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../dashboard/sidebar/Sidebar';
import { FaUpload, FaTag, FaBoxOpen, FaDollarSign, FaStar, FaImage, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API, APIAuthenticated } from '../../../http';

const AddProduct = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productTotalStockQuantity: "",
    totalRating: "",
    image: null,
    category: ""
  });

  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/api/category/');
        setCategories(response.data.data || response.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      setProductData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create and set preview URL
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    // Append all product data to FormData
    formData.append('productName', productData.productName);
    formData.append('productDescription', productData.productDescription);
    formData.append('productPrice', productData.productPrice);
    formData.append('productTotalStockQuantity', productData.productTotalStockQuantity);
    formData.append('category', productData.category);
    
    // Only append totalRating if it has a value
    if (productData.totalRating) {
      formData.append('totalRating', productData.totalRating);
    }
    
    // Only append image if one was selected
    if (productData.image) {
      formData.append('image', productData.image);
    }

    // DETAILED DEBUG LOGGING
    console.log("=== PRODUCT SUBMISSION DEBUG ===");
    console.log("📤 Product Data State:", productData);
    console.log("📤 Has Image?:", !!productData.image);
    if (productData.image) {
      console.log("📤 Image Details:", {
        name: productData.image.name,
        type: productData.image.type,
        size: productData.image.size,
        lastModified: productData.image.lastModified
      });
    }
    console.log("📤 FormData Entries:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}:`, { name: value.name, type: value.type, size: value.size });
      } else {
        console.log(`  ${key}:`, value);
      }
    }
    console.log("================================");

    try {
      const response = await APIAuthenticated.post('/api/product/create', formData);
      console.log("✅ Product created:", response.data);
      toast.success("Product added successfully");
      navigate("/listProduct");
    } catch (error) {
      console.error("❌ Error creating product:", error);
      console.error("❌ Error response:", error.response);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Error data:", error.response?.data);
      const errorMessage = error?.response?.data?.message || error?.message || "Error creating product. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new product to your inventory</p>
        </div>

        <div className="bg-blue-100 rounded-xl shadow-md overflow-hidden border border-blue-200">
          <div className="p-6 border-b border-blue-200">
            <h2 className="text-lg font-semibold text-blue-800">Product Information</h2>
            <p className="text-sm text-blue-600">Fill in the details for your new product</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Image Upload */}
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center bg-white rounded-lg p-6 border-2 border-dashed border-blue-300">
                  <div className="mb-4 text-center">
                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Product Image</h3>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                  </div>

                  <div className="mt-2 w-full">
                    <label className="block">
                      <input 
                        type="file" 
                        name="image" 
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="flex flex-col items-center justify-center">
                        {previewUrl || productData.image ? (
                          <div className="relative w-full h-52 mb-4">
                            <img
                              src={previewUrl || (productData.image ? URL.createObjectURL(productData.image) : "")}
                              alt="Product preview"
                              className="w-full h-full object-contain rounded-md"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-52 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                            <span className="text-gray-400 text-sm">No image selected</span>
                          </div>
                        )}
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaUpload className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                          Upload Image
                        </button>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Tips</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Use high-quality, well-lit images</li>
                          <li>Show the product from multiple angles</li>
                          <li>Include detailed product specifications</li>
                          <li>Set competitive pricing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaTag className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        required
                        className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBoxOpen className="h-4 w-4 text-gray-400" />
                      </div>
                      <select
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 appearance-none"
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat._id || cat.id || cat.name} value={cat.name || cat.categoryName || cat}>
                            {cat.name || cat.categoryName || cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                      Price (Rs) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaDollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        value={productData.productPrice}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        min="0"
                        step="0.01"
                        className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="productTotalStockQuantity" className="block text-sm font-medium text-gray-700">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBoxOpen className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="productTotalStockQuantity"
                        name="productTotalStockQuantity"
                        value={productData.productTotalStockQuantity}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        min="0"
                        step="1"
                        className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="totalRating" className="block text-sm font-medium text-gray-700">
                      Initial Rating (0-5)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaStar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="totalRating"
                        name="totalRating"
                        value={productData.totalRating}
                        onChange={handleChange}
                        placeholder="0.0"
                        min="0"
                        max="5"
                        step="0.1"
                        className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave empty for no initial rating</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={productData.productDescription}
                    onChange={handleChange}
                    placeholder="Enter detailed description of the product..."
                    required
                    rows={6}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Include key features, materials, dimensions, and any other relevant information
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/listProduct")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
