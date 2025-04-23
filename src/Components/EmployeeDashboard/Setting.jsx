
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'

const Setting = () => {
    const navigate = useNavigate()
    const {user} = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSetting({...setting, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(setting.newPassword !== setting.confirmPassword){
            setError("Password Not Matched")
        } else {
            try {
                const response = await axios.put("https://ems-backend-2-a7rt.onrender.com/api/setting/change-password", setting, { 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                if(response.data.success){
                    navigate("/admin_dashboard/employees")
                    setError("")
                }
            } catch(error) {
                if(error.response && !error.response.data.success){
                    setError(error.response.data.error)
                }
            }
        }
    }

  return (
    <div className='max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-4 sm:mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Change Password</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3 sm:mb-4">
                <label htmlFor="oldPassword" className='text-sm font-medium text-gray-700'>Old Password</label>
                <input 
                    type="password" 
                    name="oldPassword" 
                    placeholder='Old Password' 
                    onChange={handleChange} 
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md' 
                    required
                />
            </div>
            <div className="mb-3 sm:mb-4">
                <label htmlFor="newPassword" className='text-sm font-medium text-gray-700'>New Password</label>
                <input 
                    type="password" 
                    name="newPassword" 
                    placeholder='New Password' 
                    onChange={handleChange} 
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md' 
                    required
                />
            </div>
            <div className="mb-3 sm:mb-4">
                <label htmlFor="confirmPassword" className='text-sm font-medium text-gray-700'>Confirm Password</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder='Confirm Password' 
                    onChange={handleChange} 
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md' 
                    required
                />
            </div>
            <button 
                type="submit" 
                className='w-full mt-4 bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'
            > 
                Change Password
            </button>
        </form>
    </div>
  )
}

export default Setting