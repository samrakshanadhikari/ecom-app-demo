import { Link } from 'react-router-dom'
import Navbar from '../../globals/components/navbar/Navbar'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItem } from '../../store/cartSlice'

const Cart = () => {
  
  const dispatch=useDispatch();
  const {cart} =useSelector((state)=>state.cart)

  useEffect(()=>{
    dispatch(fetchCartItem())
  },[dispatch])

  console.log("cart", cart)

  


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
              {/* Example Cart Item */}
             {
              cart?.data?.length > 0 ? (
                cart?.data?.map((item)=>(
                   <div key={item._id} className="flex flex-col md:flex-row gap-6 border-b pb-6">
                {/* Image */}
                <img
                  src={`http://localhost:3000/${item.productId.productImageUrl}`}
                  alt="Sample Product"
                  className="w-28 h-28 object-contain rounded-md"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item?.productId?.productName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.productId.productDescription}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-base font-bold text-gray-800">
                      {item.productId.productPrice}
                    </span>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-3 mt-3">
                    <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                      <FaMinus size={12} />
                    </button>
                    <span>1</span>
                    <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                {/* Delete Button */}
                <div className="flex items-start">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
                ))
              ): (
              <>
              <h1>Data not found</h1>
              </>

              )
             }
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
                  <span>Rs. 999.00</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>Rs. 999.00</span>
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
