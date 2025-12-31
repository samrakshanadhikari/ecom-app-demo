import { Link } from 'react-router-dom'
import Navbar from '../../globals/components/navbar/Navbar'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItem, removeCartItem, updateQuantity } from '../../store/cartSlice'
import { IMAGE_BASE_URL } from '../../config/api'

const Cart = () => {

  const dispatch = useDispatch();
  const { cart, status } = useSelector((state) => state.cart)

  useEffect(() => {
    console.log("🛒 Fetching cart items...");
    dispatch(fetchCartItem())
  }, [dispatch])

  useEffect(() => {
    console.log("📊 Cart state:", cart);
    console.log("📊 Cart data:", cart?.data);
    console.log("📊 Cart status:", status);
  }, [cart, status]);

  const handleIncreaseQuantity = (productId, quantity) => {
    dispatch(updateQuantity(productId, quantity + 1))
  }

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity(productId, quantity - 1))
    }
  }

  const handledelete=(productId)=>{
    dispatch(removeCartItem(productId));
  }

  const totalItem= cart?.data?.length || 0;
  const totalQuantity= cart?.data?.reduce((prev, curr)=>prev + curr.quantity, 0 ) || 0;
  const subTotal= cart?.data?.reduce((prev, curr)=>prev + curr?.quantity * curr?.productId?.productPrice, 0 ) || 0;

  return (
    <>
      <Navbar />
      <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto mt-10">
        <div className="bg-white text-gray-900 py-10">
          <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wide">
            Your Shopping Cart
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {
                status === 'loading' ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 mt-4">Loading cart...</p>
                  </div>
                ) : cart?.data && cart.data.length > 0 ? (
                  cart.data.map((item) => (
                    <div key={item._id} className="flex flex-col md:flex-row gap-6 border-b pb-6 bg-white p-4 rounded-lg shadow-sm">
                      {/* Image */}
                      <img
                        src={`${IMAGE_BASE_URL}/${item.productId.productImageUrl}`}
                        alt={item?.productId?.productName || "Product"}
                        className="w-28 h-28 object-contain rounded-md"
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item?.productId?.productName}
                        </h3>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.productId.productDescription}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xl font-bold text-blue-600">
                            Rs {item.productId.productPrice}
                          </span>
                        </div>

                        {/* Quantity control */}
                        <div className="flex items-center gap-3 mt-3">
                          <button 
                            onClick={() => handleDecreaseQuantity(item?.productId?._id, item?.quantity)} 
                            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-4 py-1 bg-gray-100 rounded font-medium">{item?.quantity}</span>
                          <button 
                            onClick={() => handleIncreaseQuantity(item?.productId?._id, item?.quantity)} 
                            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="flex items-start">
                        <button 
                          onClick={() => handledelete(item?.productId?._id)} 
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Remove from cart"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="mb-4">
                      <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some products to get started!</p>
                    <Link to="/products">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                )
              }
            </div>

            {/* Summary */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Summary</h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{totalItem}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Quantity</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subTotal}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>Rs. {subTotal}</span>
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
