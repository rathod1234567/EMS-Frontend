
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import AdminSidebar from './AdminSidebar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between h-12 bg-indigo-700 text-white px-4 sticky top-0 z-10 sm:px-6">
        <div className="flex items-center">
          <button className="md:hidden focus:outline-none mr-4" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <p className="truncate text-sm sm:text-base">Welcome {user.name}</p>
        </div>
        <button
          className="px-3 py-1 sm:px-4 sm:py-1 bg-indigo-800 rounded hover:bg-indigo-900 text-sm sm:text-base"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;