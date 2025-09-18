import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder } from '../../store/orderSlice';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../globals/components/navbar/Navbar';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleOrder } = useSelector(state => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrder(id));
    }
  }, [dispatch, id]);

  if (!singleOrder) return <div className="text-center py-10 text-gray-500">No order found.</div>;

  const orderedAt = new Date(singleOrder.createdAt).toLocaleString();


  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 mt-20 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-4">Order Details</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Shipping Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
            <div>
              <p><strong>Address:</strong> {singleOrder.shippingAddress}</p>
              <p><strong>Phone:</strong> {singleOrder.phoneNumber}</p>
            </div>
            <div>
              <p><strong>Order Status:</strong> {singleOrder.orderStatus}</p>
              <p><strong>Payment Method:</strong> {singleOrder.paymentMethod}</p>
              <p><strong>Ordered At:</strong> {orderedAt}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Products</h2>
          <div className="space-y-6">
            {Array.isArray(singleOrder.products) && singleOrder.products.length > 0 ? (
              singleOrder.products.map(item => {
                const product = item.productId; // populated product object
                return (
                  <div key={item._id} className="flex items-center gap-6 border rounded-lg p-5 shadow">
                    <img
                      src={product ? `http://localhost:3000/${product.productImageUrl}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAVVbswAkCTT7A1GGA4TK-pQS0zCU8KAJemw&s'}
                      alt={product ? product.productName : 'Product'}
                      className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {product ? product.productName : 'Unknown Product'}
                      </h3>
                      <p className="text-gray-600 mt-1">Quantity: <span className="font-medium">{item.quantity}</span></p>
                    </div>
                    {singleOrder.orderStatus === 'delivered' && (
                      <Link to="/review"
                       
                        className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                      >
                        Give Review
                      </Link>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No products found in this order.</p>
            )}
          </div>
        </section>

        <div className="mt-10 text-right text-2xl font-bold text-gray-900">
          Total Amount: Rs. {singleOrder.totalAmount}
        </div>

        <Link
          to="/myorder"
          className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg shadow"
        >
          ← Back to My Orders
        </Link>
      </div>
    </>
  );
};

export default OrderDetails;
