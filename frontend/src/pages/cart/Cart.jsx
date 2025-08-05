import { Link } from 'react-router-dom'
import Navbar from '../../globals/components/navbar/Navbar'

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto mt-10">
        <div className="bg-white text-gray-900 py-10">
          <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wide">Your Shopping Cart</h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm">
                <img
                  src="/placeholder.jpg"
                  alt="Book Cover"
                  className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                />
                
                <div className="flex-1 w-full space-y-2">
                  <h2 className="text-xl font-bold">Sample Book Title</h2>
                  <p className="text-sm text-gray-500">By Sample Author</p>
                  <p className="text-sm text-gray-500">Category: Fiction</p>
                  <p className="text-xs text-gray-400">Published: 2023</p>

                  <div className="flex justify-between items-center mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-2 py-1 bg-white">
                      <button className="px-2 text-blue-600 hover:text-blue-800 transition">−</button>
                      <span className="w-8 text-center">1</span>
                      <button className="px-2 text-blue-600 hover:text-blue-800 transition">+</button>
                    </div>

                    {/* Price and Delete */}
                    <div className="text-right space-y-1">
                      <p className="text-sm text-gray-400 line-through">Rs. 1000.00</p>
                      <p className="font-semibold text-green-600">Rs. 800.00</p>
                      <p className="text-xs text-green-700">You save 20%</p>
                      <button className="text-red-500 hover:text-red-700 transition block" title="Remove item">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Summary</h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Quantity</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. 800.00</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>Rs. 900.00</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 px-4 rounded-lg mt-4 font-medium">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
