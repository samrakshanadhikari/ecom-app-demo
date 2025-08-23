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
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Discover the best <span className="text-green-600">products</span> <br />
              at unbeatable prices
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your one-stop destination for electronics, fashion, books, and more.
              Start shopping now and experience seamless service.
            </p>

            <a href="#categories" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition duration-200 shadow-md">
              Shop Now
            </a>

            <div className="flex items-center mt-8 space-x-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-center p-4">
            <img
              src={LandingImage}
              alt="Shopping"
              className="w-full max-w-lg h-auto rounded-2xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </div>
      <div id="categories">
        <Category/>
      </div>
      <FetchProduct/>
 
    </>
  );
};

export default LandingPage;
