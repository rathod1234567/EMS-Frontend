
import React, { useEffect,useState } from 'react'
import { fetchDepartments } from '../../Utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

    const [departments,setDepartments] =useState([])
    const [formData,setFormData]=useState({})
     const navigate=useNavigate()
    useEffect(()=>{

        const getDepartments = async ()=>{
            const departments= await fetchDepartments()
            setDepartments(departments)
      
            }
            getDepartments()

    },[]) 

    const handleChange=(e)=>{
        const {name,value,files}=e.target 
        if(name ==="image"){
            setFormData((prevData)=>({...prevData,[name] :files[0]}))
        }else{
            setFormData((prevData)=>({...prevData,[name] :value}))
        }
    }

    const handleSubmit= async (e)=>{
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key])
        })
 

        try{

            const response =await axios.post("https://ems-backend-2-a7rt.onrender.com/api/add_employee/add",formDataObj,{
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem("token")}` 
                }
            })
            
            if(response.data.success){
                navigate("/admin_dashboard/employees")

            }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

  return (
    <div>
        
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6 '>Add New Employee</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
                    <input type="text" name="name" placeholder='Enter Name' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                <div>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type="email" name="email" placeholder='Enter Email' onChange={handleChange}  className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                <div>
                    <label htmlFor="employeeId" className='block text-sm font-medium text-gray-700'>Employee ID</label>
                    <input type="text" name="employeeId" placeholder='Enter employeeId' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                <div>
                    <label htmlFor="dob" className='block text-sm font-medium text-gray-700'>Date Of Birth</label>
                    <input type="date" name="dob" placeholder='Enter DOB' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>

                <div>
                    <label htmlFor="gender" className='block text-sm font-medium text-gray-700'>Gender</label>
                    <select name="gender" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>

                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                </div>

                <div>
                    <label htmlFor="maritalStatus" className='block text-sm font-medium text-gray-700'>Marital Status</label>
                    <select name="maritalStatus" placeholder="marital Status" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="designation" className='block text-sm font-medium text-gray-700'>Designation</label>
                    <input type="text" name="designation" placeholder='Designation' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
                <div>
                    <label htmlFor="department" className='block text-sm font-medium text-gray-700'>Department</label>
                    <select name="department"  onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Department</option>

                        {departments.map(dep=>(
                            <option key={dep._id} value={dep._id}>{dep.department_name}</option>
                        ))}
                      
                    </select>
                </div>

                <div>
                    <label htmlFor="salary" className='block text-sm font-medium text-gray-700'>Salary</label>
                    <input type="number" name="salary" placeholder='Salary' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>

                <div>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type="password" name="password" placeholder='Enter password' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>

                <div>
                    <label htmlFor="role" className='block text-sm font-medium text-gray-700'>Role</label>
                    <select name="role" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Upload Image</label>
                    <input type="file" name="image" placeholder='Upload Image' accept='image/*' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
                </div>
            </div>
            <button type='submit' className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Add Employee</button>
        </form>
    </div>

    </div>
  )
}

export default AddEmployee