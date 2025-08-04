import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FetchProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:3000/api/product/getAll")
            setProducts(response.data.data)
        }
        fetchProducts();
    }, [])

    console.log("Products  : ", products);

    return (
        <>

            <div className="antialiased text-gray-900 ">
                <div className=" bg-gray-200  min-h-screen p-8 flex items-center justify-center">
                    {
                        products.map((pro, index) => (
                            <>
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 gap-4">

                                    <div className="h-48 bg-cover bg-center" ></div>
                                    <img className="h-48 w-full object-cover object-end" src={`http://localhost:3000/${pro.productImageUrl}`} alt="Home in Countryside" />
                                    <div className="p-6">
                                        <div className="flex items-baseline">
                                            <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">New</span>
                                            <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                                3 beds &bull; 2 baths
                                            </div>
                                        </div>
                                        <h4 className="mt-2 font-semibold text-lg leading-tight truncate">{pro.productName}</h4>

                                        <div className="mt-1">
                                            <span>Rs productPrice</span>
                                            <span className="text-gray-600 text-sm">/ wk</span>
                                        </div>


                                        <div className="mt-2 flex items-center">
                                            <span className="text-teal-600 font-semibold">
                                                <span>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="far fa-star"></i>

                                                    <span className="ml-2 text-gray-600 text-sm">{pro.totalRating} reviews</span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </>
                        ))

                    }
                </div>
            </div>
        </>
    )
}

export default FetchProduct
