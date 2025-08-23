import React, { useEffect } from "react";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800"> Admin Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card icon={<FaUsers className="text-3xl text-blue-600" />} title="Users" value={totalUser} />
          <Card icon={<FaShoppingCart className="text-3xl text-green-600" />} title="Orders" value={totalOrder} />
          <Card icon={<FaDollarSign className="text-3xl text-yellow-600" />} title="Revenue" value="$4,500" />
          <Card icon={<FaBoxOpen className="text-3xl text-purple-600" />} title="Products" value={totalProduct} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Delivered Orders</h2>
            <p className="text-4xl font-bold text-green-700">{deliveredOrders?.length}</p>
            <p className="text-sm text-green-600 mt-1">Orders delivered successfully</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Pending Orders</h2>
            <p className="text-4xl font-bold text-yellow-700">{pendingOrders?.length}</p>
            <p className="text-sm text-yellow-600 mt-1">Waiting for confirmation or in process</p>
          </div>

          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Cancelled Orders</h2>
            <p className="text-4xl font-bold text-red-700">{cancelledOrders?.length}</p>
            <p className="text-sm text-red-600 mt-1">Orders cancelled or failed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex items-center gap-4 transition duration-300">
    <div className="bg-gray-100 p-4 rounded-full">{icon}</div>
    <div>
      <h4 className="text-gray-600 font-medium">{title}</h4>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;

