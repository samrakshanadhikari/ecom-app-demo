import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../store/orderSlice";
import Sidebar from "../dashboard/sidebar/Sidebar";
import { FaEye, FaEdit, FaTrashAlt, FaSearch, FaFilter, FaShoppingBag, FaFileInvoiceDollar } from "react-icons/fa";
import { MdLocalShipping, MdPendingActions, MdCancel, MdCheckCircle } from "react-icons/md";
import Pagination from "../pagination/Pagination";

const PAGE_SIZE = 8; // Reduced page size for better UI appearance

const OrderList = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality UI
  const [filterStatus, setFilterStatus] = useState("all"); // For filter functionality UI

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Calculate order metrics
  const totalOrders = allOrders?.data?.length || 0;
  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
  const pendingOrders = allOrders?.data?.filter(order => order.orderStatus === "pending")?.length || 0;
  const deliveredOrders = allOrders?.data?.filter(order => order.orderStatus === "delivered")?.length || 0;
  const onTheWayOrders = allOrders?.data?.filter(order => order.orderStatus === "ontheway")?.length || 0;
  const cancelledOrders = allOrders?.data?.filter(order => order.orderStatus === "cancalled")?.length || 0;
  
  // Format currency
  const formatCurrency = (amount) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const paginatedOrders = allOrders?.data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get status badge based on order status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <MdCheckCircle className="mr-1" />
            Delivered
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <MdPendingActions className="mr-1" />
            Pending
          </span>
        );
      case 'ontheway':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <MdLocalShipping className="mr-1" />
            On the way
          </span>
        );
      case 'cancalled':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <MdCancel className="mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status || "Unknown"}
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1 p-8 bg-blue-50 min-h-screen w-full">
        {/* Header Section with Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
              <p className="text-gray-600 mt-1">Track and manage all customer orders</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Filter Button */}
              <div className="relative inline-block">
                <select
                  className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 w-full"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="ontheway">On the way</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancalled">Cancelled</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Order Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 flex items-center">
              <div className="rounded-full p-3 bg-white text-blue-600 mr-4">
                <FaShoppingBag size={20} />
              </div>
              <div>
                <p className="text-blue-600 text-sm">Total Orders</p>
                <p className="text-xl font-semibold text-blue-800">{totalOrders}</p>
              </div>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 flex items-center">
              <div className="rounded-full p-3 bg-white text-yellow-600 mr-4">
                <MdPendingActions size={20} />
              </div>
              <div>
                <p className="text-blue-600 text-sm">Pending</p>
                <p className="text-xl font-semibold text-blue-800">{pendingOrders}</p>
              </div>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 flex items-center">
              <div className="rounded-full p-3 bg-white text-green-600 mr-4">
                <MdCheckCircle size={20} />
              </div>
              <div>
                <p className="text-blue-600 text-sm">Delivered</p>
                <p className="text-xl font-semibold text-blue-800">{deliveredOrders}</p>
              </div>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 flex items-center">
              <div className="rounded-full p-3 bg-white text-red-600 mr-4">
                <MdCancel size={20} />
              </div>
              <div>
                <p className="text-blue-600 text-sm">Cancelled</p>
                <p className="text-xl font-semibold text-blue-800">{cancelledOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-blue-100 shadow-md rounded-lg overflow-hidden border border-blue-200">
          <div className="overflow-x-auto">
            {paginatedOrders.length > 0 ? (
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Order Details</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-50 divide-y divide-blue-200">
                  {paginatedOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
                            <FaFileInvoiceDollar size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Order #{order._id.substr(-6)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.products?.length || 0} items
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.userId?.username || "Unknown"}</div>
                        <div className="text-xs text-gray-500">{order.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(order.totalAmount || 0)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {order.paymentMethod || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.orderStatus)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                        <button
                          aria-label="View order details"
                          className="text-gray-600 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-blue-50"
                          onClick={() => alert(`View order ${order._id}`)}
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          aria-label="Edit order"
                          className="text-gray-600 hover:text-green-600 transition-colors p-1 rounded-full hover:bg-green-50"
                          onClick={() => alert(`Edit order ${order._id}`)}
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          aria-label="Delete order"
                          className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                          onClick={() => alert(`Delete order ${order._id}`)}
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <FaShoppingBag size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                <p className="text-gray-500">There are no orders matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
