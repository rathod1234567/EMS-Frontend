

import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from "react-icons/fa"
import { useAuth } from '../../Context/AuthContext'

const EmployeeSidebar = () => {
    const {user} = useAuth()
    
  return (
    <div className='bg-gray-800 text-white h-screen w-60 overflow-y-auto'>
        <div className='bg-indigo-600 h-12 flex items-center justify-center'>
            <h3 className='text-xl sm:text-2xl md:text-3xl text-center font-luxurious'>Employee MS</h3> 
        </div>
        <div className='mt-3'>
            <NavLink to="/employee_dashboard" className={({isActive})=>`${isActive ? "bg-indigo-600 " : " "} flex items-center space-x-2 sm:space-x-4 block py-2 sm:py-3 px-3 sm:px-4 rounded transition`} end>
                <FaTachometerAlt className="text-sm sm:text-base" />
                <span className="text-sm sm:text-base">Dashboard</span>
            </NavLink>
            <NavLink to={`/employee_dashboard/profile/${user._id}`} className={({isActive})=>`${isActive ? "bg-indigo-600" : " "} flex items-center space-x-2 sm:space-x-4 block py-2 sm:py-3 px-3 sm:px-4 rounded transition`}>
                <FaUsers className="text-sm sm:text-base" />
                <span className="text-sm sm:text-base">My Profile</span>
            </NavLink>
            <NavLink to={`/employee_dashboard/leaves/${user._id}`} className={({isActive})=>`${isActive ? "bg-indigo-600 " : " "} flex items-center space-x-2 sm:space-x-4 block py-2 sm:py-3 px-3 sm:px-4 rounded transition`}>
                <FaBuilding className="text-sm sm:text-base" />
                <span className="text-sm sm:text-base">Leave</span>
            </NavLink>
            <NavLink to={`/employee_dashboard/salary/${user._id}`} className={({isActive})=>`${isActive ? "bg-indigo-600 " : " "} flex items-center space-x-2 sm:space-x-4 block py-2 sm:py-3 px-3 sm:px-4 rounded transition`}>
                <FaCalendarAlt className="text-sm sm:text-base" />
                <span className="text-sm sm:text-base">Salary</span>
            </NavLink>
            <NavLink to="/employee_dashboard/setting" className={({isActive})=>`${isActive ? "bg-indigo-600 " : " "} flex items-center space-x-2 sm:space-x-4 block py-2 sm:py-3 px-3 sm:px-4 rounded transition`}>
                <FaCogs className="text-sm sm:text-base" />
                <span className="text-sm sm:text-base">Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default EmployeeSidebar

