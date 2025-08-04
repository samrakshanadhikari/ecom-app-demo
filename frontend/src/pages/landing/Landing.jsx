import React from "react";
import LandingImage from "../../assets/landing.jpeg"; 

const LandingPage = () => {
  return (
    <div className="min-h-screen mt-[-96px] flex items-center justify-center bg-white px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Main title of your <br /> landing page
          </h1>
          <p className="text-gray-600 mb-6">
            Free landing page template to promote your business startup and generate leads for the offered services
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">
            Get Started
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Sed fermentum felis ut cursu
          </p>
        </div>
        <div>
          <img src={LandingImage} alt="Landing Illustration" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
