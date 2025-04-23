
import React, { useState } from 'react'
import EmployeeSidebar from "../Components/EmployeeDashboard/EmployeeSidebar"
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/EmployeeDashboard/Navbar'

const EmployeeDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  
  return (
    <>
    <div className='flex flex-col md:flex-row relative'>
     
      <div className={`${sidebarVisible ? 'block' : 'hidden'} md:hidden fixed inset-0 bg-black bg-opacity-50 z-20`} 
           onClick={() => setSidebarVisible(false)}></div>
      
     
      <div className={`${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 md:relative fixed z-30 md:block`}>
        <EmployeeSidebar />
      </div>
      
      <div className='flex-1 bg-gray-100 min-h-screen w-full'>
        <Navbar toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default EmployeeDashboard