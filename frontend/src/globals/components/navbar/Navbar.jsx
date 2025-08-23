import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItem } from '../../../store/cartSlice';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { cart } = useSelector((state) => state.cart);

    // useEffect(() => {
    //   dispatch(fetchCartItem ())
    // }, [dispatch])

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const store=cart?.data?.length;
  console.log("cart in the navbar", store)



  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">

        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="h-9 w-9 object-contain"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsraf4VoY7hzsYfKLorCvZkzFfBuo2f40Jjw&s"
            alt="Logo"
          />
          <span className="text-xl font-bold text-gray-800">Ecommerce</span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            Shop
          </Link>
          <Link to="/category" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            Categories
          </Link>
          <Link to="/myOrder" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
            My Orders
          </Link>
        </nav>

        {/* Right Controls: Cart, Auth */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-green-600 transition-colors"
            title="Cart"
          >
            <FaShoppingCart size={22} />
            {cart?.data?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {cart?.data?.length}
              </span>
            )}
          </Link>

          {/* Auth Controls */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className="hidden sm:inline-block text-sm text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="inline-block text-sm text-white bg-green-600 rounded-lg px-4 py-2 hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="hidden sm:inline-flex items-center justify-center text-gray-700 hover:text-green-600 text-xl transition-colors"
                title="Profile"
              >
                <FaUser />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-white bg-red-500 rounded-lg px-4 py-2 hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
