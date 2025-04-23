
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-2-a7rt.onrender.com/api/add_employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await axios.delete(`https://ems-backend-2-a7rt.onrender.com/api/add_employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          alert('Employee deleted successfully');
          navigate('/employees'); 
        }
      } catch (error) {
        alert('Error deleting employee');
        console.error(error);
      }
    }
  };

  return (
    <>
      {employee ? (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
          <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <img
                src={`https://ems-backend-2-a7rt.onrender.com/${employee.userId?.profileImage || ''}`}
                className='rounded-full border w-72'
                alt='profile'
              />
            </div>
            <div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Name</p>
                <p className='font-medium'>{employee.userId.name}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Employee Id</p>
                <p className='font-medium'>{employee.employeeId}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Date Of Birth</p>
                <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Gender:</p>
                <p className='font-medium'>{employee.gender}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Department:</p>
                <p className='font-medium'>{employee.department.department_name}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Marital Status</p>
                <p className='font-medium'>{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <button
              onClick={handleDelete}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            >
              Delete Employee
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default EmployeeView;