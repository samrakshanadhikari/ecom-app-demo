import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { API_BASE_URL, IMAGE_BASE_URL } from '../../config/api';

const FetchProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/product/getAll`);
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
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
            Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products at competitive prices
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((pro) => (
            <div
              key={pro._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group"
            >
              <div className="relative group">
                <div className="flex justify-center items-center h-56 bg-gray-50 overflow-hidden">
                  <img
                    src={`${IMAGE_BASE_URL}/${pro.productImageUrl}`}
                    alt={pro.productName}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    New
                  </div>
                </div>
              </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors truncate">
                  {pro.productName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 h-10">
                  {pro.productDescription}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    {renderStars(pro.totalRating || 4)}
                  </div>
                  <div>
                    <span className="text-blue-600 font-bold text-lg">
                      Rs {pro.productPrice}
                    </span>
                  </div>
                </div>

                <Link 
                  to={`/singleProduct/${pro._id}`} 
                  className="block w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-center"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default FetchProduct;
