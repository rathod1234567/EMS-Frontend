
import React from 'react'
import { useAuth } from '../Context/AuthContext'
import AdminSidebar from '../Components/Dashboard/AdminSidebar'
import Navbar from '../Components/Dashboard/Navbar'
// import AdminReport from '../Components/Dashboard/AdminReport'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const {user } = useAuth()
 
  return (
    <>
    <div className='flex flex-col md:flex-row'>
      <AdminSidebar />
      <div className='flex-1 md:ml-60 bg-gray-100 min-h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default AdminDashboard