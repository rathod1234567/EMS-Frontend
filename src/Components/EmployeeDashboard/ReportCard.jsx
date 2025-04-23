
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../Context/AuthContext'

const ReportCard = () => {
    const {user} = useAuth()
  return (
    <>
    <div className='p-3 sm:p-4 md:p-6'>
    <div className='rounded flex bg-white shadow-md'>
         <div className="text-xl sm:text-2xl md:text-3xl flex justify-center items-center bg-indigo-600 text-white p-3 sm:px-4">
            <FaUser />
         </div>
         <div className='pl-3 sm:pl-4 py-2 sm:py-3'>
            <p className='text-base sm:text-lg font-semibold'>Welcome!!</p>
            <p className='text-lg sm:text-xl font-bold'>{user.name}</p>
         </div>
    </div>
    </div>
    </>
  )
}

export default ReportCard