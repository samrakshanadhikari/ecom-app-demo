import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/categorySlice';

const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setCategoryData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(addCategory(categoryData))
            alert("Category added successfully");
            navigate("/categoryList");
        } catch (error) {
            console.error(error);
            alert("Error creating category. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <section className="flex flex-col flex-grow items-center justify-center px-6 py-12 bg-gray-50">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Add Category</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="flex flex-col items-center gap-4 mb-6">
                            <p className="text-lg text-gray-300">Upload Image</p>
                            <input onChange={handleChange} type="file" name='image' id='image' accept='image/*' hidden />
                            <label htmlFor="image" className="cursor-pointer">
                                <img
                                    src={categoryData.image ? URL.createObjectURL(categoryData.image) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZjNoW6ODGDcPspZCSV2U13ThQ8LrfVlNgCA&s"}
                                    alt="Uploaded preview or placeholder"
                                    className="w-48 h-48 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    name="categoryName"
                                    value={categoryData.categoryName || ''}
                                    onChange={handleChange}
                                    placeholder="Enter the product name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddProduct;
