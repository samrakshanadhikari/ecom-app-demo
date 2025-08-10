import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListAllUser } from "../../store/authSlice";
import Sidebar from "../dashboard/sidebar/Sidebar";
import { FaPen, FaTrash } from "react-icons/fa";
import Pagination from "../pagination/Pagination";


const PAGE_SIZE = 15;

const Userlist = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-3">{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="px-6 py-3">{user.username}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3 capitalize">{user.role}</td>
                    <td className="px-6 py-3 text-right space-x-4">
                      <button
                        aria-label="Edit user"
                        className="text-green-500 hover:text-green-600"
                      >
                        <FaPen size={18} />
                      </button>
                      <button
                        aria-label="Delete user"
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-3 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default Userlist;
