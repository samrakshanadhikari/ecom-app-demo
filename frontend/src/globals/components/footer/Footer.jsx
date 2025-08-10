import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-white dark:bg-gray-800 flex justify-center items-center w-screen">
      <footer className="bg-white text-gray-700 border-t border-gray-200 w-full">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <h2 className="text-2xl font-bold text-blue-600">Ecommerce</h2>
              <p className="mt-3 text-sm text-gray-600">
                Your trusted destination for premium gadgets, accessories, and unbeatable deals. We deliver quality with speed.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Customer Support:</span> +977-9841234567
              </p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-blue-600 hover:scale-110 transition"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-[#E1306C] hover:scale-110 transition"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-[#1DA1F2] hover:scale-110 transition"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-green-500 hover:scale-110 transition"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Shop by Category</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-blue-600">Groceries</a></li>
                <li><a href="#" className="hover:text-blue-600">Electronics</a></li>
                <li><a href="#" className="hover:text-blue-600">Fashion & Clothing</a></li>
                <li><a href="#" className="hover:text-blue-600">Accessories</a></li>
                <li><a href="#" className="hover:text-blue-600">Home Appliances</a></li>
              </ul>
            </div>


            {/* Help & Info */}
            <div>
              <h3 className="font-semibold mb-3">Help & Info</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Return Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Shipping Info</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h3 className="font-semibold mb-3">My Account</h3>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-blue-600">Login / Register</a></li>
                <Link to="/myOrder"><li><button className="hover:text-blue-600">My Order</button></li></Link>
                <li><a href="#" className="hover:text-blue-600">Wishlist</a></li>
                <li><a href="#" className="hover:text-blue-600">Track Order</a></li>
              </ul>
            </div>
          </div>

          {/* Apps & Payment */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10">
            {/* App Links */}
            <div className="flex space-x-3 mb-4 md:mb-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />

            </div>

            {/* Payment Icons */}
            <div className="flex gap-3">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" className="h-8" />
              <img src="https://img.icons8.com/color/48/000000/apple-pay.png" alt="Apple Pay" className="h-8" />
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center text-xs text-gray-500 mt-10 border-t pt-4">
            &copy; {new Date().getFullYear()} ExpertSquad Bazar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
