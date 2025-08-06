import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { Bookmark } from 'lucide-react';
import Navbar from '../../globals/components/navbar/Navbar';
import Footer from '../../globals/components/footer/Footer';
import { useParams } from 'react-router-dom';
import { listSingleProduct } from '../../store/productSlice';
import {useDispatch, useSelector} from "react-redux"
import { STATUS } from '../../globals/status/Status';
import {toast} from "react-toastify"
import { addToCart } from '../../store/cartSlice';


const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleProduct, status } = useSelector((state) => state.product);
  
    const [quantity, setQuantity]=useState(1)


    useEffect(() => {
        if (id) {
            dispatch(listSingleProduct(id));
        }
    }, [dispatch, id]);


    console.log("singleProduct : ",singleProduct)


    const handleAddToCart= async()=>{
       if(id ){
        await  dispatch(addToCart(id, quantity));

        if(status===STATUS.SUCCESS){
            toast.success("Product successfully added on the cart")
            
        }else if(status===STATUS.ERROR){
            toast.error("Faild to add the product on the cart")
        }
       }
    }

    console.log("singleProduct : ", singleProduct)

    

    return (
        <>
            <Navbar />
            <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto">
                <div className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-10 px-6 relative">
                        <div className="relative flex justify-center items-center">
                            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 flex justify-center">
                                <img
                                    src={`http://localhost:3000/${singleProduct?.productImageUrl}`}
                                    alt="Product"
                                    className="w-[300px] object-cover rounded-xl"
                                />
                            </div>

                            <button
                                aria-label="Add to wishlist"
                                title="Add to wishlist"
                                className="absolute top-4 right-4 border border-gray-300 text-gray-700 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-sm"
                            >
                                <Bookmark size={20} className="text-gray-500 hover:text-indigo-600" />
                            </button>
                        </div>
                        <div className="flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                                   {singleProduct?.productName}
                                </h1>

                                <div className="flex flex-wrap gap-3">
                                    <span className="bg-blue-100 text-blue-700 px-4 py-1 text-sm rounded-full font-semibold">
                                        Category: {singleProduct?.category}
                                    </span>
                                    <span className="bg-purple-100 text-purple-700 px-4 py-1 text-sm rounded-full font-semibold">
                                        Type: Headphones
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-2xl font-bold">
                                    <span className="text-red-600">Rs. {singleProduct?.productPrice}</span>
                                    <span className="line-through text-gray-400 text-xl">Rs. 1000</span>
                                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md font-semibold">
                                        -20%
                                    </span>
                                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">
                                        On Sale
                                    </span>
                                </div>

                                <hr className="my-4 border-gray-300" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700 text-sm">
                                    <p>
                                        <span className="font-medium text-gray-900">Brand:</span> {singleProduct?.category}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">SKU:</span> JBL-HDP-001
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">Released:</span> 01/01/2024
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">Stock:</span> {singleProduct?.productTotalStockQuantity}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        {singleProduct?.productDescription}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button onClick={handleAddToCart}   className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition">
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition">
                                        <FaMoneyBillWave /> Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SingleProduct;
