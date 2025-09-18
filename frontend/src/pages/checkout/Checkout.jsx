import React, { useEffect, useState } from 'react';
import Footer from '../../globals/components/footer/Footer';
import Navbar from '../../globals/components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItem } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { submitOrder } from '../../store/orderSlice';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItem());
  }, [dispatch]);

  const totalItem = cart?.data?.length || 0;
  const totalQuantity = cart?.data?.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cart?.data?.reduce(
    (sum, item) => sum + item.quantity * (item.productId?.productPrice || 0),
    0
  );
  const discount = subTotal * 0.05;
  const total = subTotal - discount;

  const handlePlaceOrder = () => {
    if (!phoneNumber || !shippingAddress) {
      return alert('Please enter phone number and shipping address.');
    }

    const orderPayload = {
      products: cart?.data?.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      phoneNumber,
      totalAmount: total,
      paymentMethod: paymentMethod.toLowerCase(),
      orderStatus: 'pending',
    };

    console.log(orderPayload);
    dispatch(submitOrder(orderPayload, navigate));
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto">
        <div className="min-h-screen text-gray-900 py-10">
          <h1 className="text-3xl font-extrabold text-center mb-10 tracking-wide">Checkout</h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              <p className="text-gray-500">Review your order before placing it.</p>

              <div className="mt-5 space-y-4">
                {cart?.data?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center bg-gray-50 border border-gray-200 p-4 rounded-lg"
                  >
                    <img
                      src={`http://localhost:3000/${item?.productId?.productImageUrl}`}
                      alt="Book"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold">{item?.productId?.productName}</h3>
                      <p className="text-sm text-gray-500">{item?.productId?.productDescription}</p>
                      <p className="text-sm text-gray-500">{item?.productId?.category}</p>
                      <p className="text-xs text-gray-400">
                        Stock: {item?.productId?.productTotalStockQuantity}
                      </p>
                      <p className="mt-2 text-sm">
                        Quantity: <span className="font-semibold">{item?.quantity}</span>
                      </p>
                      <p className="text-md font-semibold text-gray-700">
                        Rs. {item?.productId?.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment and Shipping */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">Payment & Shipping</h2>

              {/* Payment Method Selection */}
              <p className="mt-4 text-lg font-medium">Payment Method</p>
              <div className="mt-3 space-y-3">
                {/* COD Option */}
                <label
                  className={`flex items-center space-x-2 bg-gray-100 border p-4 rounded-lg cursor-pointer ${
                    paymentMethod === 'COD' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="hidden"
                  />
                  <span className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center">
                    {paymentMethod === 'COD' && (
                      <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                    )}
                  </span>
                  <p className="font-medium">Cash on Delivery</p>
                </label>

                {/* Khalti Option */}
                <label
                  className={`flex items-center space-x-2 bg-gray-100 border p-4 rounded-lg cursor-pointer ${
                    paymentMethod === 'KHALTI' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'KHALTI'}
                    onChange={() => setPaymentMethod('KHALTI')}
                    className="hidden"
                  />
                  <span className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center">
                    {paymentMethod === 'KHALTI' && (
                      <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                    )}
                  </span>
                  <p className="font-medium">Khalti Payment</p>
                </label>
              </div>

              {/* Shipping Info */}
              <div className="mt-6">
                <label className="block font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm"
                />

                <label className="block font-medium text-gray-700 mt-4">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>

              {/* Price Summary */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-gray-700">Total Items</p>
                  <p className="text-gray-700">{totalItem}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Total Quantity</p>
                  <p className="text-gray-700">{totalQuantity}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">Rs. {subTotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Discount</p>
                  <p className="text-gray-700">Rs. {discount} (5%)</p>
                </div>
                <div className="flex justify-between font-semibold">
                  <p className="text-lg">Total</p>
                  <p className="text-lg">Rs. {total}</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-blue-500 text-white p-3 rounded-lg w-full"
                >
                  {paymentMethod === 'COD' ? 'Place Order' : 'Pay with Khalti'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
