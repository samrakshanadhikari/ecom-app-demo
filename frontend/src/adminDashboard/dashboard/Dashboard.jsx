import React, { useEffect } from "react";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartLine
} from "react-icons/fa";
import Sidebar from "./sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ListAllUser } from "../../store/authSlice";
import { listAllProduct } from "../../store/productSlice";
import { fetchAllOrders } from "../../store/orderSlice";

const AdminDashboard = () => {


  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.auth)
  const { product } = useSelector((state) => state.product)
  const { allOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(ListAllUser());
    dispatch(listAllProduct());
    dispatch(fetchAllOrders());

  }, [])




  const totalUser = userList?.data?.length;
  const totalProduct = product?.length;
  const totalOrder = allOrders?.data?.length;

  //for order section
const deliveredOrders = allOrders?.data?.filter(order => order.orderStatus === "delivered") || [];
const pendingOrders = allOrders?.data?.filter(order => order.orderStatus === "pending") || [];
const cancelledOrders = allOrders?.data?.filter(order => order.orderStatus === "cancelled") || [];


  console.log("deliveresorder ", deliveredOrders)



  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
            <p className="text-blue-600 mt-2">Welcome to your dashboard overview</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center">
              <FaChartLine className="mr-2" />
              <span>Dashboard Overview</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card 
            icon={<FaUsers className="text-3xl text-blue-600" />} 
            title="Total Users" 
            value={totalUser}
            description="Registered accounts"
          />
          <Card 
            icon={<FaShoppingCart className="text-3xl text-green-600" />} 
            title="Total Orders" 
            value={totalOrder}
            description="All customer orders"
          />
          <Card 
            icon={<FaDollarSign className="text-3xl text-yellow-600" />} 
            title="Revenue" 
            value="$4,500"
            description="Total earnings"
          />
          <Card 
            icon={<FaBoxOpen className="text-3xl text-purple-600" />} 
            title="Products" 
            value={totalProduct}
            description="Items in inventory"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 border border-blue-200 p-6 rounded-2xl shadow-md transition-transform hover:scale-105 duration-300">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-white p-3 mr-4 shadow-md">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-blue-800">Delivered Orders</h2>
            </div>
            <p className="text-4xl font-bold text-blue-800">{deliveredOrders?.length}</p>
            <p className="text-sm text-blue-600 mt-3">Orders successfully delivered to customers</p>
          </div>

          <div className="bg-blue-100 border border-blue-200 p-6 rounded-2xl shadow-md transition-transform hover:scale-105 duration-300">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-white p-3 mr-4 shadow-md">
                <FaClock className="text-2xl text-yellow-500" />
              </div>
              <h2 className="text-lg font-semibold text-blue-800">Pending Orders</h2>
            </div>
            <p className="text-4xl font-bold text-blue-800">{pendingOrders?.length}</p>
            <p className="text-sm text-blue-600 mt-3">Orders waiting for processing or shipment</p>
          </div>

          <div className="bg-blue-100 border border-blue-200 p-6 rounded-2xl shadow-md transition-transform hover:scale-105 duration-300">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-white p-3 mr-4 shadow-md">
                <FaTimesCircle className="text-2xl text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-blue-800">Cancelled Orders</h2>
            </div>
            <p className="text-4xl font-bold text-blue-800">{cancelledOrders?.length}</p>
            <p className="text-sm text-blue-600 mt-3">Orders that were cancelled or failed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, title, value, description }) => (
  <div className="bg-blue-100 rounded-2xl shadow-md hover:shadow-xl p-6 flex items-center gap-4 transition-all duration-300 border border-blue-200 hover:scale-105">
    <div className="bg-white p-4 rounded-full shadow-md">{icon}</div>
    <div>
      <h4 className="text-blue-700 font-medium">{title}</h4>
      <p className="text-2xl font-bold text-blue-800">{value}</p>
      <p className="text-xs text-blue-600 mt-1">{description}</p>
    </div>
  </div>
);

export default AdminDashboard;

