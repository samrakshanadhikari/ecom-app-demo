import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../../dashboard/sidebar/Sidebar';
import { FaRupeeSign, FaBoxOpen, FaStar, FaTags } from "react-icons/fa";
const ListProduct = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/product/getAll');
            console.log("response" ,response)
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }; 

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/product/delete/${id}`, {
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
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-center mb-6"> All Products</h1>

                <div className="space-y-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-4"
                        >
                            {/* Image */}
                            <img
                                src={`http://localhost:3000/${product.productImageUrl}`}
                                alt={product.productName}
                                className="w-full md:w-40 h-36 object-cover rounded-md"
                            />

                            <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
                                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    {product.productName}
                                </h2>
                                <p className="text-sm text-gray-600 line-clamp-2">{product.productDescription}</p>
                                <div className="text-sm text-gray-500 space-y-1 mt-1">
                                    <p className="flex items-center gap-2">
                                        <FaRupeeSign className="text-gray-400" /> Rs. {product.productPrice}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaBoxOpen className="text-gray-400" /> {product.productTotalStockQuantity} in stock
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaStar className="text-yellow-500" /> {product.totalRating} / 5
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaTags className="text-gray-400" /> {product.category}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center text-xl">
                                <button
                                    title="Edit"
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => alert("Edit logic here")}
                                >
                                    <FaEdit />
                                </button>
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
            </div>
        </div>
    );
};

export default ListProduct;
