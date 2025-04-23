
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    department_name: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ems-backend-2-a7rt.onrender.com/api/department/add', department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        navigate('/admin_dashboard/departments');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="md:ml-10 p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
      <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Add New Department</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="department_name" className="block text-sm sm:text-base font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              name="department_name"
              onChange={handleChange}
              placeholder="Enter Department Name"
              className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mt-4 sm:mt-5">
            <label htmlFor="description" className="block text-sm sm:text-base font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="5"
            ></textarea>
          </div>
          <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-md transition">
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;