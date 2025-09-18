import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPlusCircle,
  FiTag,
  FiUsers,
  FiShoppingCart,
  FiImage, 
  FiHome, 
  FiLogOut,
  FiLayers,
  FiPackage,
  FiSettings
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-72 bg-blue-800 shadow-xl min-h-screen p-5 flex flex-col text-white text-base sm:w-64 md:w-72">
      <div className="mb-10 px-2">
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <div className="flex items-center mt-2">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
          <p className="text-sm text-blue-200">Online</p>
        </div>
      </div>

      <div className="mb-6 px-2">
        <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-2">Main</div>
        <nav className="space-y-1">
          <SidebarLink to="/dashboard" icon={<FiHome />} label="Dashboard" current={location.pathname === "/dashboard"} />
          <SidebarLink to="/userList" icon={<FiUsers />} label="Users" current={location.pathname === "/userList"} />
          <SidebarLink to="/orderList" icon={<FiShoppingCart />} label="Orders" current={location.pathname === "/orderList"} />
        </nav>
      </div>
      
      <div className="mb-6 px-2">
        <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-2">Products</div>
        <nav className="space-y-1">
          <SidebarLink to="/addProduct" icon={<FiPlusCircle />} label="Add Product" current={location.pathname === "/addProduct"} />
          <SidebarLink to="/listProduct" icon={<FiPackage />} label="All Products" current={location.pathname === "/listProduct"} />
        </nav>
      </div>
      
      <div className="mb-6 px-2">
        <div className="text-xs uppercase tracking-wider text-blue-300 font-semibold mb-2">Categories</div>
        <nav className="space-y-1">
          <SidebarLink to="/addCategory" icon={<FiPlusCircle />} label="Add Category" current={location.pathname === "/addCategory"} />
          <SidebarLink to="/categoryList" icon={<FiLayers />} label="All Categories" current={location.pathname === "/categoryList"} />
        </nav>
      </div>

      <div className="mt-auto px-2">
        <div 
          onClick={handleLogout} 
          className="flex items-center px-4 py-3 rounded-lg hover:bg-red-700 transition duration-150 cursor-pointer"
        >
          <div className="p-1.5 bg-red-700 rounded-lg mr-3">
            <FiLogOut className="text-lg" />
          </div>
          <span className="font-medium">Log out</span>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, current }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2.5 rounded-lg transition duration-150 ${
      current 
        ? 'bg-blue-700 text-white' 
        : 'text-blue-100 hover:bg-blue-700/50'
    }`}
  >
    <div className={`p-1.5 rounded-lg mr-3 ${current ? 'bg-blue-600' : 'bg-blue-700/30'}`}>
      {icon}
    </div>
    <span className="font-medium">{label}</span>
    {current && <div className="ml-auto w-1.5 h-5 rounded-full bg-blue-400"></div>}
  </Link>
);

export default Sidebar;
