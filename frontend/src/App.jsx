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
    <BrowserRouter>
      {role !== "admin" && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
       <Route path='/profile' element={<ProtectedRoute element={Profile} allowedRoles={['admin', 'user']} />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addProduct' element={<ProtectedRoute element={AddProduct} allowedRoles={['admin']} />} />
         <Route path='/listProduct' element={<ListProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
