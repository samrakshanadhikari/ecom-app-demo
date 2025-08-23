import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/categorySlice';
import { FaTag, FaUpload, FaArrowLeft, FaImage, FaInfoCircle, FaFolder, FaLayerGroup } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        image: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            setCategoryData(prev => ({
                ...prev,
                image: file
            }));
            
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            setCategoryData(prev => ({
                ...prev,
                [name]: file
            }));
            
            // Create and set preview URL
            if (file) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result);
                };
                fileReader.readAsDataURL(file);
            } else {
                setPreviewUrl(null);
            }
        } else {
            setCategoryData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await dispatch(addCategory(categoryData)).unwrap();
            toast.success("Category added successfully");
            navigate("/categoryList");
        } catch (error) {
            console.error(error);
            toast.error("Error creating category. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 p-6 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <button 
                            onClick={() => navigate('/categoryList')}
                            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" /> Back to Categories
                        </button>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center">
                                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                                        <FaFolder className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800">Add New Category</h1>
                                        <p className="text-gray-600 mt-1">Create a new product category</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-600 font-medium">Organized categories improve customer experience</p>
                            </div>
                        </div>
                    </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <FaLayerGroup className="h-5 w-5 text-gray-500 mr-3" />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Category Information</h2>
                                <p className="text-sm text-gray-500">Fill in the details for your new category</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column - Image Upload */}
                            <div className="md:col-span-1">
                                <div 
                                    className={`flex flex-col items-center bg-gray-50 rounded-lg p-6 border-2 border-dashed ${isDragging ? 'border-gray-500 bg-gray-50' : 'border-gray-300'} hover:border-gray-400 hover:bg-gray-50 transition-all transform hover:scale-[1.01] duration-200`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="mb-4 text-center">
                                        <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">Category Image</h3>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                                    </div>

                                    <div className="mt-2 w-full">
                                        <label className="block">
                                            <input 
                                                type="file" 
                                                name="image" 
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            <div className="flex flex-col items-center justify-center">
                                                {previewUrl || categoryData.image ? (
                                                    <div className="relative w-full h-52 mb-4 shadow-sm rounded-md overflow-hidden group">
                                                        <img
                                                            src={previewUrl || (categoryData.image ? URL.createObjectURL(categoryData.image) : "")}
                                                            alt="Category preview"
                                                            className="w-full h-full object-contain rounded-md"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                            <span className="text-white text-sm px-2 py-1 bg-gray-800 bg-opacity-75 rounded">Click to change</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-52 flex flex-col items-center justify-center bg-gray-100 rounded-md mb-4 shadow-inner">
                                                        <span className="text-gray-400 text-sm mb-2">Drag & drop your image here</span>
                                                        <span className="text-gray-400 text-xs">or click to browse</span>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                                                >
                                                    <FaUpload className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
                                                    Upload Image
                                                </button>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Category Details */}
                            <div className="md:col-span-1">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                                            Category Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaTag className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="categoryName"
                                                name="categoryName"
                                                value={categoryData.categoryName}
                                                onChange={handleChange}
                                                placeholder="Enter category name"
                                                required
                                                className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 shadow-sm"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <FaInfoCircle className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-gray-800">Category Best Practices</h3>
                                                <div className="mt-2 text-sm text-gray-700">
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        <li>Use clear, descriptive names</li>
                                                        <li>Keep category structure simple</li>
                                                        <li>Use high-quality category images</li>
                                                        <li>Ensure consistent naming conventions</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end space-y-reverse space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate("/categoryList")}
                                className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Adding Category...' : 'Add Category'}
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
