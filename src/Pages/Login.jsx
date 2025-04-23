
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { signInAnonymously } from "firebase/auth";
// import { auth } from "./firbase.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://ems-backend-2-a7rt.onrender.com/api/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin_dashboard");
        } else {
          navigate("/employee_dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Internal Server Error");
      }
    }
  };

  
 
 const handleGuestLogin=async(e,email,password)=>{
    e.preventDefault()
    try {
      const response = await axios.post("https://ems-backend-2-a7rt.onrender.com/api/auth/login", {
        email:email,
        password:password
      });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin_dashboard");
        } else {
          navigate("/employee_dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Internal Server Error");
      }
    }

  }
 
  return (
    <>
     
      <div className="absolute top-4 right-4 z-10">
        <button
          className="hover:bg-indigo-900 bg-indigo-700 text-white text-xl font-medium rounded px-3 py-2 "
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </div>
      <div className="flex items-center justify-center h-screen w-full bg-gradient-to-b from-indigo-700 from-50% to-slate-100 to-50%">
        <div className="border border-slate-200 shadow-lg p-6 sm:p-8 w-full max-w-sm bg-white rounded-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-indigo-700">
            Employee Management System
          </h1>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center text-indigo-800">
            Login Form
          </h2>
          {error && (
            <p className="text-rose-600 text-sm mb-3 bg-rose-50 p-2 rounded text-center">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-slate-700 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-slate-600">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>

           
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-3"
              onClick={(e)=>handleGuestLogin(e,"admin@gmail.com","admin")}
            >
              Login as Guest Admin
            </button>
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-yellow-300 transition mt-2"
              onClick={(e)=>handleGuestLogin(e,"guest@gmail.com","guest123")}
            >
              Login as Guest Employee
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
