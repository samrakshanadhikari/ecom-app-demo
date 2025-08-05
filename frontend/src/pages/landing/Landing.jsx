import React from "react";
import LandingImage from "../../assets/landing.jpeg"; // Make sure this path is correct
import Navbar from "../../globals/components/navbar/Navbar";
import FetchProduct from "../products/FetchProduct";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className=" flex items-center justify-center bg-white px-6 pt-24">
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

            <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600 transition duration-200">
              Shop Now
            </button>

            <p className="text-sm text-gray-400 mt-4">
              Fast delivery. Easy returns. Trusted by thousands of happy customers.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-center p-4">
            <img
              src={LandingImage}
              alt="Free Delivery"
              className="w-96 h-96 rounded-full shadow-lg object-cover"
            />
          </div>


        </div>
      </div>
      <FetchProduct/>
    </>
  );
};

export default LandingPage;
