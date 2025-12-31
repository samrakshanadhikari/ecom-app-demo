import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { listProductByCategory } from "../../store/productSlice"; 
import { addToCart } from "../../store/cartSlice";
import { STATUS } from "../../globals/status/Status";
import Navbar from "../../globals/components/navbar/Navbar";
import { IMAGE_BASE_URL } from "../../config/api";
import { FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductByCategory = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select products by category and status from the redux store
  const products = useSelector((state) => state.product.productByCategory);
  const status = useSelector((state) => state.product.status);
  const cartStatus = useSelector((state) => state.cart.status);

  useEffect(() => {
    if (categoryName) {
      // Decode the category name from URL
      const decodedCategoryName = decodeURIComponent(categoryName);
      console.log("🔍 Loading products for category:", decodedCategoryName);
      dispatch(listProductByCategory(decodedCategoryName));
    }
  }, [dispatch, categoryName]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    try {
      await dispatch(addToCart(productId, 1));
      if (cartStatus === STATUS.SUCCESS || cartStatus !== STATUS.ERROR) {
        toast.success('Product added to cart!');
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-500 text-sm" />
      ) : (
        <FaRegStar key={index} className="text-gray-300 text-sm" />
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Products in {decodeURIComponent(categoryName)}</h1>
          <p className="text-gray-600 mt-2">Browse our collection of {decodeURIComponent(categoryName)} products</p>
        </div>

        {status === STATUS.LOADING ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
          </div>
        ) : (!products || products.length === 0) ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
            <p className="text-gray-500 text-sm">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div 
                key={product._id || product.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
              >
                <div className="relative">
                  <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={`${IMAGE_BASE_URL}/${product.productImageUrl}`}
                      alt={product.productName}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {product.productTotalStockQuantity > 0 ? (
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        In Stock
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Out of Stock
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 transition-colors truncate">
                    {product.productName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                    {product.productDescription}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(product.totalRating || 4)}
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        Rs {product.productPrice}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/singleProduct/${product._id}`)}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={product.productTotalStockQuantity === 0}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 ${
                          product.productTotalStockQuantity === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </>
  );
};

export default ProductByCategory;
