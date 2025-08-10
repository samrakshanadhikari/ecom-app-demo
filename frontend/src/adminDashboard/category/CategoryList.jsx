import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../dashboard/sidebar/Sidebar";
import Pagination from "../pagination/Pagination"; // your pagination component
import { FaPen, FaTrash } from "react-icons/fa";
import { listAllCategory, deleteCategory } from "../../store/categorySlice";

const PAGE_SIZE = 10;

const CategoryList = () => {
  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.category);
  const categories = categoryState.category || [];

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(listAllCategory());
  }, [dispatch]);

  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / PAGE_SIZE);

  const paginatedCategories = categories.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (category) => {
    console.log("Edit category:", category);
    // implement your edit logic or routing here
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Category List</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category, index) => (
                  <tr
                    key={category._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-3">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="px-6 py-3 flex items-center space-x-4">
                      {category.categoryImageUrl ? (
                        <img
                          src={`http://localhost:3000/${category.categoryImageUrl}`}
                          alt={category.categoryName || "category"}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded" />
                      )}
                      <span className="font-medium">{category.categoryName}</span>
                    </td>
                    <td className="px-6 py-3 text-right space-x-4">
                      <button
                        aria-label="Edit category"
                        className="text-green-500 hover:text-green-600"
                        onClick={() => handleEdit(category)}
                      >
                        <FaPen size={18} />
                      </button>
                      <button
                        aria-label="Delete category"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(category._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-3 text-center text-gray-500">
                    No categories found.
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

export default CategoryList;
