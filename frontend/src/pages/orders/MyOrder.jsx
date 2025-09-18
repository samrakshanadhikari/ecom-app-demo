import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../globals/components/navbar/Navbar";
import Footer from "../../globals/components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../store/orderSlice";

const MyOrder = () => {
  const [filter, setFilter] = useState("pending");
  const { myOrder } = useSelector((state) => state?.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  console.log("my orders", myOrder);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const renderOrderTable = (orders) => (
  <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-4">
    <table className="min-w-full text-sm text-gray-800">
      <thead className="bg-gray-100 rounded-t-lg">
        <tr className="text-left">
          <th className="px-6 py-3 font-semibold tracking-wide">Items</th>
          <th className="px-6 py-3 font-semibold tracking-wide">Total Amt</th>
          <th className="px-6 py-3 font-semibold tracking-wide">Order Status</th>
          <th className="px-6 py-3 font-semibold tracking-wide">Ordered At</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const orderedAt = new Date(order.createdAt).toLocaleString();
          return (
            <tr key={order._id} className="border-b hover:bg-gray-30 transition duration-200">
              <td className="px-6 py-4">
                <div className="space-y-3">
                  {order.products.map((item, index) => (
                    <Link
                      key={index}
                      to={`/orderDetails/${order._id}`}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      <img
                        src={`http://localhost:3000/${item.productId?.productImageUrl}`}
                        alt={item.productId?.productName || 'Product'}
                        className="w-14 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.productId?.productName}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                <Link to={`/orderDetails/${order._id}`}>Rs. {order.totalAmount}</Link>
              </td>
              <td className="px-6 py-4">
                <Link to={`/orderDetails/${order._id}`}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus?.toLowerCase() === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus?.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <Link to={`/orderDetails/${order._id}`}>{orderedAt}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);


  const filteredOrders =
    myOrder?.filter((o) => o.orderStatus?.toLowerCase() === filter) || [];

  return (
    <>
      <Navbar />
      <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 mt-4">My Orders</h2>

        <div className="flex gap-2 mb-6">
          <div className="relative">
            <select
              className="appearance-none h-full rounded border border-gray-400 bg-white text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            {filter === "pending"
              ? "Pending Orders"
              : filter === "delivered"
              ? "Delivered Orders"
              : "Cancelled Orders"}
          </h3>
          {renderOrderTable(filteredOrders)}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MyOrder;
