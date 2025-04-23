
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({});
  const [depLoading, setDepLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ems-backend-2-a7rt.onrender.com/api/department/${id}`, department, {
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

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`https://ems-backend-2-a7rt.onrender.com/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, [id]);

  return (
    <div className="md:ml-30 p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
      {depLoading ? (
        <div className="flex items-center justify-center h-screen text-lg">Loading...</div>
      ) : (
        <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Edit Department</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="department_name" className="block text-sm sm:text-base font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                name="department_name"
                onChange={handleChange}
                value={department.department_name || ''}
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
                value={department.description || ''}
                className="mt-1 w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows="5"
              ></textarea>
            </div>
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-md transition">
              Edit Department
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditDepartment;