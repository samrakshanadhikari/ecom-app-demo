import React from "react";
import {
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Sidebar from "./sidebar/Sidebar";

const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 4000 },
  { month: "Apr", revenue: 3500 },
  { month: "May", revenue: 5000 },
  { month: "Jun", revenue: 4200 },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800"> Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card icon={<FaUsers className="text-3xl text-blue-600" />} title="Users" value="120" />
          <Card icon={<FaShoppingCart className="text-3xl text-green-600" />} title="Orders" value="85" />
          <Card icon={<FaDollarSign className="text-3xl text-yellow-600" />} title="Revenue" value="$4,500" />
          <Card icon={<FaBoxOpen className="text-3xl text-purple-600" />} title="Products" value="65" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
             Monthly Revenue Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Delivered Orders</h2>
            <p className="text-4xl font-bold text-green-700">12</p>
            <p className="text-sm text-green-600 mt-1">Orders delivered successfully</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Pending Orders</h2>
            <p className="text-4xl font-bold text-yellow-700">7</p>
            <p className="text-sm text-yellow-600 mt-1">Waiting for confirmation or in process</p>
          </div>

          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Cancelled Orders</h2>
            <p className="text-4xl font-bold text-red-700">9</p>
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

