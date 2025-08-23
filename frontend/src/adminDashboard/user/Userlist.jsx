import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListAllUser } from "../../store/authSlice";
import Sidebar from "../dashboard/sidebar/Sidebar";
import { FaEdit, FaTrashAlt, FaSearch, FaUserCircle, FaFilter } from "react-icons/fa";
import Pagination from "../pagination/Pagination";

const PAGE_SIZE = 15;

const Userlist = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality UI

  useEffect(() => {
    dispatch(ListAllUser());
  }, [dispatch]);

  const totalUsers = userList?.data?.length || 0;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const paginatedUsers = userList?.data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get a status badge based on user role
  const getUserStatusBadge = (role) => {
    switch(role) {
      case 'admin':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            Admin
          </span>
        );
      case 'user':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            {role}
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1 p-8 bg-blue-50 min-h-screen w-full">
        {/* Header Section with Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
              <p className="text-gray-600 mt-1">Manage your system users</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Filter Button */}
              <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                <FaFilter className="mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-100 p-4 rounded-lg shadow-sm border border-blue-200">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Active Users: {userList?.data?.filter(user => user.role === 'user').length || 0}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Admin Users: {userList?.data?.filter(user => user.role === 'admin').length || 0}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Total Users: {totalUsers}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* User Table */}
        <div className="bg-blue-100 shadow-md rounded-lg overflow-hidden border border-blue-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-200">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 divide-y divide-blue-200">
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              <FaUserCircle size={24} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-500">User #{(currentPage - 1) * PAGE_SIZE + index + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getUserStatusBadge(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          aria-label="Edit user"
                          className="text-gray-600 hover:text-green-600 transition-colors p-1 rounded-full hover:bg-green-50 mr-2"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          aria-label="Delete user"
                          className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FaUserCircle size={40} className="text-gray-300 mb-2" />
                        <p>No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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

export default Userlist;
