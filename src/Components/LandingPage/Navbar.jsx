import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGuestLogin = () => {
    navigate("/employee_dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-700 text-white px-4 py-3 shadow-md z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
         
          <div 
            className="text-xl font-bold cursor-pointer" 
            onClick={() => navigate("/")}
          >
            EmployeeMS
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

         
          <div className="hidden md:flex md:gap-3 lg:gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-indigo-700 font-semibold px-3 py-1.5 lg:px-4 lg:py-2 rounded hover:bg-gray-100 transition text-sm lg:text-base"
            >
              Login
            </button>
            <button
              onClick={handleGuestLogin}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1.5 lg:px-4 lg:py-2 rounded transition text-sm lg:text-base"
            >
              Guest Admin
            </button>
            <button
              onClick={handleGuestLogin}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-3 py-1.5 lg:px-4 lg:py-2 rounded transition text-sm lg:text-base"
            >
              Guest Employee
            </button>
          </div>
        </div>

     
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-3 pb-2`}>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition text-sm w-full"
            >
              Login
            </button>
            <button
              onClick={() => {
                handleGuestLogin();
                setIsMenuOpen(false);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded transition text-sm w-full"
            >
              Guest Admin Login
            </button>
            <button
              onClick={() => {
                handleGuestLogin();
                setIsMenuOpen(false);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded transition text-sm w-full"
            >
              Guest Employee Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;