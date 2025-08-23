import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../dashboard/sidebar/Sidebar";
import Pagination from "../pagination/Pagination"; // your pagination component
import { FaPen, FaTrash, FaSearch, FaTags, FaPlus } from "react-icons/fa";
import { listAllCategory, deleteCategory } from "../../store/categorySlice";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryState = useSelector((state) => state.category);
  const categories = categoryState.category || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(listAllCategory());
  }, [dispatch]);

  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / PAGE_SIZE);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.categoryName && category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <button 
            onClick={() => navigate('/addCategory')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FaPlus className="mr-2" /> Add Category
          </button>
        </div>
        
        {/* Stats card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FaTags size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Categories</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalCategories}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 w-full sm:w-64 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category, index) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {category.categoryImageUrl ? (
                          <img
                            src={`http://localhost:3000/${category.categoryImageUrl}`}
                            alt={category.categoryName || "category"}
                            className="w-10 h-10 object-cover rounded-md shadow-sm"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <FaTags className="text-gray-400" />
                          </div>
                        )}
                        <span className="ml-4 text-sm font-medium text-gray-900">{category.categoryName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        aria-label="Edit category"
                        className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 mr-2 transition-colors"
                        onClick={() => handleEdit(category)}
                      >
                        <FaPen size={14} className="mr-1" /> Edit
                      </button>
                      <button
                        aria-label="Delete category"
                        className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                        onClick={() => handleDelete(category._id)}
                      >
                        <FaTrash size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500 border-b">
                    {searchTerm ? "No categories found matching your search." : "No categories found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        
        {totalCategories === 0 && !searchTerm && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-700 text-sm">
              No categories have been created yet. Click the "Add Category" button to create your first category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
