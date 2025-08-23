import { Link, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiPlusCircle,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiImage, 
  FiHome, 
  FiLogOut,FiBarChart,
  FiLayers, FiSettings 
} from "react-icons/fi";

const Sidebar = () => {
  const navigate=useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-72 bg-white shadow-xl border-r border-gray-200 min-h-screen p-6 flex flex-col text-gray-800 text-base sm:w-64 md:w-72">
      <div className="flex items-center space-x-4 mb-12">
        <Link to="/adminProfile">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuXKMwBGR8gRhpZlFDGIhWEbxiKs8sHUrpcg&s"
            alt="Admin"
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
        </Link>
        <div>
          <h3 className="text-lg font-semibold">Admin</h3>
          <p className="text-sm text-green-500 mt-1">Online</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarLink to="/dashboard" icon={<FiHome />} label="Dashboard" />
        <SidebarLink to="/userList" icon={<FiUsers />} label="Users" />
        <SidebarLink to="/orderList" icon={<FiShoppingCart />} label="Orders" />
  
        <SidebarLink to="/addProduct" icon={<FiPlusCircle />} label="Add Product" />
        <SidebarLink to="/listProduct" icon={<FiGrid />} label="All Products" />
        
       
        <SidebarLink to="/addCategory" icon={<FiPlusCircle />} label="Add Category" />
        <SidebarLink to="/categoryList" icon={<FiLayers />} label="All Categories" />

        <SidebarLink to="/settings" icon={<FiSettings />} label="Settings" />


        <div onClick={handleLogout} className="flex items-center px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition duration-150 mt-4 cursor-pointer">
          <FiLogOut className="text-xl mr-3" />
          <span className="font-medium">Log out</span>
        </div>
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 transition duration-150"
  >
    <span className="text-xl mr-3">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default Sidebar;
