import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../../globals/components/navbar/Navbar';

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", userData);
      const token = response.data.token;
      localStorage.setItem('role', response.data.data.role);
      console.log("Response", response)

      if (!token) {
        alert("No token received. Login failed.");
        return;
      }

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      const role = decoded.role;
      console.log("Login role:", role);

      alert("User logged in successfully");


      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };


  return (
    <>
      <Navbar />
      <section className="bg-white min-h-screen flex items-center justify-center px-6 py-8">
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          {/* <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a> */}
          <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
              Login to the system
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Your email
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-indigo-600"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-700"
                  >
                    I accept the{' '}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-600">
                Don’t have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login