import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <CheckCircle className="text-green-500 w-20 h-20 mx-auto" />
        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            to="/myOrder"
            className="w-full inline-block px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="w-full inline-block px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
