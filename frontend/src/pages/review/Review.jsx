import React from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { FaStar } from "react-icons/fa";

const Review = () => {

    return (
        <>
            <Navbar />
            <div className="pt-16 px-4 md:px-8 max-w-screen-xl mx-auto mb-10">
                <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Share Your Review</h2>
                        <p className="text-gray-500">We'd love to hear your thoughts on this product!</p>
                    </div>

                    <div className="flex justify-center mb-6 space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className="text-yellow-400 cursor-pointer hover:text-yellow-500 transition-colors"
                                size={32}
                            />
                        ))}
                    </div>
                    <div className="mb-6 text-gray-700">
                        <p className="font-semibold">Your opinion matters!</p>
                        <p>Provide a detailed review to help others make informed decisions.</p>
                    </div>

                    <textarea
                        placeholder="Write your review..."
                        className="w-full p-4 bg-gray-100 text-gray-800 rounded-lg resize-none mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        rows="6"
                        readOnly
                    />

                    <button
                        className="w-full py-3 bg-yellow-500 text-white rounded-lg text-xl hover:bg-yellow-400 transition-colors cursor-not-allowed"
                        disabled
                    >
                        Submit Your Review
                    </button>

                    <div className="mt-8 p-6 border-t-2 border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Thank you for your feedback!</h3>
                        <p className="text-gray-500">Your review helps others discover great books.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Review;
