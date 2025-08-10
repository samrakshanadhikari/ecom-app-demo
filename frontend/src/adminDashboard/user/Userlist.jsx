import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListAllUser } from "../../store/authSlice";
import Sidebar from "../dashboard/sidebar/Sidebar";
import { FaPen, FaTrash } from "react-icons/fa";  // Pencil and Trash icons

const Userlist = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(ListAllUser());
  }, [dispatch]);

  console.log("userlist ", userList);

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
              {userList?.data?.length > 0 ? (
                userList.data.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{user.name}</td>
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
                  <td
                    colSpan="5"
                    className="px-6 py-3 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
