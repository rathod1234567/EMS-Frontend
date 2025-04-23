

import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { FaBars } from 'react-icons/fa'

const Navbar = ({ toggleSidebar }) => {
    const {user, logout} = useAuth()
  return (
   <>
    <div className='flex items-center text-white justify-between h-12 bg-indigo-600 px-3 sm:px-5 sticky top-0 z-10'>
        <div className="flex items-center">
            <button 
                className="md:hidden mr-2 text-white" 
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <FaBars />
            </button>
            <p className="text-sm sm:text-base truncate">Welcome {user.name}</p>
        </div>
        <button className='px-2 py-1 sm:px-4 sm:py-1 text-sm bg-indigo-900 rounded hover:bg-indigo-800' onClick={logout}> Logout</button>
   </div>
   </>
  )
}

export default Navbar