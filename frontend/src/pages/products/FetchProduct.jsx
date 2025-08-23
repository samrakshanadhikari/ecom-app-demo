import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FetchProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product/getAll");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);


  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-yellow-500" />
      ) : (
        <FaRegStar key={index} className="text-gray-300" />
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-800">
          Featured Products
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of premium products at competitive prices
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((pro) => (
            <div
              key={pro._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300 text-center border border-gray-100"
            >
              <div className="relative group">
                <div className="flex justify-center items-center h-56 bg-gray-50 overflow-hidden">
                  <img
                    src={`http://localhost:3000/${pro.productImageUrl}`}
                    alt={pro.productName}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
              </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {pro.productName}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-10">
                {pro.productDescription}
              </p>

              <div className="mt-3 flex justify-center items-center gap-2">
                <span className="text-gray-500 text-sm line-through">
                  Rs {pro.originalPrice || pro.productPrice + 500} 
                </span>
                <span className="text-green-600 font-bold text-lg">
                  Rs {pro.productPrice}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1 mb-5">
                {renderStars(pro.totalRating || 4)}
              </div>

              <Link 
                to={`/singleProduct/${pro._id}`} 
                className="block w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default FetchProduct;
