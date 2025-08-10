import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../store/orderSlice";
import Sidebar from "../dashboard/sidebar/Sidebar";
import { FaPen, FaTrash } from "react-icons/fa";
import Pagination from "../pagination/Pagination";

const PAGE_SIZE = 15;

const OrderList = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalOrders = allOrders?.data?.length || 0;
  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);

  const paginatedOrders = allOrders?.data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {paginatedOrders.length > 0 ? (
            <table className="min-w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-3">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="px-6 py-3 font-mono">{order._id}</td>
                    <td className="px-6 py-3">{order.userId?.username || "N/A"}</td>
                    <td className="px-6 py-3 capitalize">{order.orderStatus || "N/A"}</td>
                    <td className="px-6 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-right space-x-4">
                      <button
                        aria-label="Edit order"
                        className="text-green-500 hover:text-green-600"
                        onClick={() => alert(`Edit order ${order._id}`)}
                      >
                        <FaPen size={18} />
                      </button>
                      <button
                        aria-label="Delete order"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => alert(`Delete order ${order._id}`)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-3 text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderList;
