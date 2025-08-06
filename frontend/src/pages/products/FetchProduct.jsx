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
    <div className="bg-white min-h-screen py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Products
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
        {products.map((pro) => (
          <div
            key={pro._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 text-center border border-gray-100"
          >
    
            <div className="flex justify-center items-center h-48 bg-gray-100">
              <img
                src={`http://localhost:3000/${pro.productImageUrl}`}
                alt={pro.productName}
                className="max-h-full object-contain"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {pro.productName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{pro.productDescription}</p>


              <div className="mt-3 flex justify-center items-center gap-2">
       
                <span className="text-gray-500 text-sm line-through">
                  Rs {pro.originalPrice || pro.productPrice + 500} 
                </span>

               
                <span className="text-red-600 font-bold text-lg">
                  Rs {pro.productPrice}
                </span>
              </div>


              <div className="mt-3 flex items-center justify-center gap-1 mb-5">
                {renderStars(pro.totalRating)}

              </div>

              <Link to={`/singleProduct/${pro._id} `} className=" px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchProduct;
