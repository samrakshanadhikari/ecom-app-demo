import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <Link className="flex items-center" to="/">
                            <img
                                className="h-7 w-auto"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsraf4VoY7hzsYfKLorCvZkzFfBuo2f40Jjw&s"
                                alt="ToDo App Logo"
                            />
                      
                            <span className="ml-2 font-bold text-gray-800">Ecommerce</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                        <Link
                            className="text-sm font-medium text-gray-800 hover:text-blue-600"
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            className="text-sm font-medium text-gray-800 hover:text-blue-600"
                            to="/help"
                        >
                           Help & Support
                        </Link>
                        <Link
                            className="text-sm font-medium text-gray-800 hover:text-blue-600"
                            to="/"
                        >
                           
                        </Link>
                        <Link
                            className="text-sm font-medium text-gray-800 hover:text-blue-600"
                            to="/about"
                        >
                            About
                        </Link>
                       
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        {!isLoggedIn ? (
                            <>
                              <Link
                                    className="inline-flex items-center justify-center rounded-xl  px-3 py-2 text-sm font-semibold text-black shadow-sm transition-all duration-150 hover:bg-blue-500"
                                    to="/cart"
                                >
                                    Cart
                                </Link>
                                <Link
                                    className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
                                    to="/register"
                                >
                                    Register
                                </Link>
                                <Link
                                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500"
                                    to="/login"
                                >
                                    Login
                                </Link>
                              
                            </>
                        ) : (
                            <>
                                <Link
                                    className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
                                    to="/profile"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;