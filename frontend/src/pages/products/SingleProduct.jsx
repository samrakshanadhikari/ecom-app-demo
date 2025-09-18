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
                <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-10 px-6 relative">
                        <div className="relative flex justify-center items-center">
                            <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex justify-center border border-gray-100">
                                <img
                                    src={`http://localhost:3000/${singleProduct?.productImageUrl}`}
                                    alt={singleProduct?.productName || "Product"}
                                    className="w-[300px] object-cover rounded-xl"
                                />
                            </div>

                            <button
                                aria-label="Add to wishlist"
                                title="Add to wishlist"
                                className="absolute top-4 right-4 border border-gray-300 text-gray-700 bg-white rounded-full p-2 hover:bg-blue-50 hover:border-blue-300 transition shadow-sm"
                            >
                                <Bookmark size={20} className="text-gray-500 hover:text-blue-600" />
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
                                    <span className="bg-blue-50 text-blue-700 px-4 py-1 text-sm rounded-full font-semibold">
                                        Type: {singleProduct?.category || "Product"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-2xl font-bold">
                                    <span className="text-blue-600">Rs. {singleProduct?.productPrice}</span>
                                    <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-semibold">
                                        On Sale
                                    </span>
                                </div>

                                <hr className="my-4 border-gray-200" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700 text-sm">
                                    <p>
                                        <span className="font-medium text-gray-900">Brand:</span> {singleProduct?.category}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">SKU:</span> {singleProduct?._id?.substring(0, 8) || "JBL-001"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">Released:</span> 01/01/2024
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">Stock:</span> <span className="text-blue-600 font-medium">{singleProduct?.productTotalStockQuantity}</span>
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        {singleProduct?.productDescription}
                                    </p>
                                </div>

                                <div className="pt-6 flex items-center gap-4 mb-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button 
                                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                        >
                                            <FaMinus size={12} />
                                        </button>
                                        <span className="px-4 py-2 font-medium">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {singleProduct?.productTotalStockQuantity ? `${singleProduct.productTotalStockQuantity} units available` : "Out of stock"}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <button 
                                        onClick={handleAddToCart} 
                                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition-colors text-base font-medium"
                                    >
                                        <FaShoppingCart /> Add to Cart
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
