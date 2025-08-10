import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Profile from './pages/auth/profile/Profile';
import Navbar from './globals/components/navbar/Navbar';
import Dashboard from './adminDashboard/dashboard/Dashboard';
import AddProduct from './adminDashboard/products/add/AddProduct';
import ProtectedRoute from './routes/ProtectedRoute';
import { jwtDecode } from 'jwt-decode';
import ListProduct from './adminDashboard/products/list/ListProduct';
import FetchProduct from './pages/products/FetchProduct';
import Cart from './pages/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './adminDashboard/products/edit/EditProduct';
import store from './store/store';
import { Provider } from 'react-redux';
import Footer from './globals/components/footer/Footer';
import Checkout from './pages/checkout/Checkout';
import SingleProduct from './pages/products/SingleProduct';
import Success from './pages/orders/Success';
import Userlist from './adminDashboard/user/Userlist';
import OrderList from './adminDashboard/order/OrderList';

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        console.log("Decoded token:", decoded);

        console.log("Role : ", decoded.role)
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null);
      }
    }
  }, []);


  return (
    <Provider store={store}>
       <BrowserRouter>
        {/* {role !== "admin" && <Navbar />} */}
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProtectedRoute element={Profile} allowedRoles={['admin', 'user']} />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addProduct' element={<ProtectedRoute element={AddProduct} allowedRoles={['admin']} />} />
          <Route path='/listProduct' element={<ListProduct />} />
          <Route path='/fetchProduct' element={<FetchProduct />} />
          <Route path='/singleProduct/:id' element={<SingleProduct />} />
          <Route path='/editProduct/:id' element={<EditProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<Success />} />


          {/* Admin part */}
          <Route path='/userList' element={<Userlist />} />
          <Route path='/orderList' element={<OrderList />} />


        </Routes>
             {/* <Footer/> */}
      </BrowserRouter>


    </Provider>

     

  );
}

export default App;
