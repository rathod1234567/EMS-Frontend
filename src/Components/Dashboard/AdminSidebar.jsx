




// import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>

      <div className="hidden md:block bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-3 w-60">
        <div className="bg-indigo-700 h-12 flex items-center justify-center">
          <h3 className="text-2xl sm:text-3xl text-center font-luxurious">Employee MS</h3>
        </div>
        <div>
          <NavLink
            to="/admin_dashboard"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/employees"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded  transition`
            }
          >
            <FaUsers />
            <span>Employee</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/departments"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded  transition`
            }
          >
            <FaBuilding />
            <span>Department</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/leaves"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded  transition`
            }
          >
            <FaCalendarAlt />
            <span>Leave</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/salary/add"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded  transition`
            }
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/setting"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded  transition`
            }
          >
            <FaCogs />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
      <div
        className={`md:hidden fixed inset-0 bg-gray-800 text-white z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-60`}
      >
        <div className="bg-indigo-700 h-12 flex items-center justify-between px-4">
          <h3 className="text-2xl font-luxurious">Employee MS</h3>
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <NavLink
            to="/admin_dashboard"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            end
            onClick={toggleSidebar}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/employees"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            onClick={toggleSidebar}
          >
            <FaUsers />
            <span>Employee</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/departments"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            onClick={toggleSidebar}
          >
            <FaBuilding />
            <span>Department</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/leaves"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            onClick={toggleSidebar}
          >
            <FaCalendarAlt />
            <span>Leave</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/salary/add"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            onClick={toggleSidebar}
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>
          <NavLink
            to="/admin_dashboard/setting"
            className={({ isActive }) =>
              `${isActive ? 'bg-indigo-600' : ''} flex items-center space-x-4 block py-3 px-4 rounded hover:bg-indigo-700 transition`
            }
            onClick={toggleSidebar}
          >
            <FaCogs />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;