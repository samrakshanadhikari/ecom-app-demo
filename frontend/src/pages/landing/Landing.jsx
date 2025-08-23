import React from "react";
import LandingImage from "../../assets/landing.jpeg"; 
import Navbar from "../../globals/components/navbar/Navbar";
import FetchProduct from "../products/FetchProduct";
import Footer from "../../globals/components/footer/Footer";
import Category from "../category/Category";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text Section */}
          <div className="animate-fadeIn">
            <div className="relative inline-block mb-4">
              <span className="text-sm uppercase tracking-wider text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-md">
                Welcome to ShopSmart
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Shop Smarter, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Live Better</span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Discover quality products for every need. From electronics to fashion, 
              we've curated the best selection at competitive prices.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href="#categories" 
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Browse Categories
              </a>
              <a 
                href="#products" 
                className="inline-flex items-center justify-center bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition duration-200 shadow-sm"
              >
                View Products
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Quality Products</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-center p-4">
            <img
              src={LandingImage}
              alt="Shopping Experience"
              className="w-full max-w-lg h-auto rounded-2xl shadow-lg object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
      <div id="categories">
        <Category/>
      </div>
      <div id="products">
        <FetchProduct/>
      </div>
 
    </>
  );
};

export default LandingPage;
