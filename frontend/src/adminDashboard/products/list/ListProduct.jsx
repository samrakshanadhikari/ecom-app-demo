import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaRupeeSign, FaBoxOpen, FaStar, FaTags } from 'react-icons/fa';
import Sidebar from '../../dashboard/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import Pagination from '../../pagination/Pagination';
import { API_BASE_URL, IMAGE_BASE_URL } from '../../../config/api';

const PAGE_SIZE = 4;

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // for pagination

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/product/getAll`);
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Pagination logic
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

    // Slice the products for the current page
    const paginatedProducts = products.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );

    const handlePageChange = (page) => {
        if(page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/api/product/delete/${id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            alert('Product deleted successfully');
            fetchProducts(); 
           
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete product');
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar />

            <div className="flex-1 p-6 bg-blue-50">
                <h1 className="text-2xl font-bold text-blue-800 text-center mb-6"> All Products</h1>

                <div className="space-y-4">
                    {paginatedProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-blue-100 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 border border-blue-200"
                        >
                            {/* Image */}
                                <img
                                src={`${IMAGE_BASE_URL}/${product.productImageUrl}`}
                                alt={product.productName}
                                className="w-full md:w-40 h-36 object-cover rounded-md bg-white p-1"
                            />                            <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
                                <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                    {product.productName}
                                </h2>
                                <p className="text-sm text-gray-600 line-clamp-2">{product.productDescription}</p>
                                <div className="text-sm text-blue-500 space-y-1 mt-1">
                                    <p className="flex items-center gap-2">
                                        <FaRupeeSign className="text-blue-400" /> Rs. {product.productPrice}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaBoxOpen className="text-blue-400" /> {product.productTotalStockQuantity} in stock
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaStar className="text-yellow-500" /> {product.totalRating} / 5
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaTags className="text-blue-400" /> {product.category}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center text-xl">
                                <Link to={`/editProduct/${product._id}`}
                                    title="Edit"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaEdit />
                                </Link>
                                <button
                                    title="Delete"
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination component */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ListProduct;
