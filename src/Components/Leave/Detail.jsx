
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://ems-backend-2-a7rt.onrender.com/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  // const handleDelete = async () => {
  //   if (window.confirm('Are you sure you want to delete this employee?')) {
  //     try {
  //       const response = await axios.delete(`http://localhost:5000/api/add_employee/${leave.employeeId._id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });

  //       if (response.data.success) {
  //         alert('Employee deleted successfully');
  //         navigate('/employees');
  //       }
  //     } catch (error) {
  //       alert('Error deleting employee');
  //       console.error(error);
  //     }
  //   }
  // };

const ChangeStatus= async (id,status)=>{
  
  try {
    const response = await axios.put(`https://ems-backend-2-a7rt.onrender.com/api/leave/${id}`,{status}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
     navigate("/admin_dashboard/leaves")
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      console.log(error.response.data.error);
    }
  }
}



  return (
    <>
      {leave ? (
        
        <div className='max-w-3xl mx-auto mt-10 bg-white p-2 rounded-md shadow-md'>
          <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <img
                src={`https://ems-backend-2-a7rt.onrender.com/${leave.employeeId.userId?.profileImage || ''}`}
                className='rounded-full border w-72'
                alt='profile'
              />
            </div>
            <div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Name:</p>
                <p className='font-medium'>{leave.employeeId.userId.name}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Employee Id:</p>
                <p className='font-medium'>{leave.employeeId.employeeId}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Leave Type:</p>
                <p className='font-medium'>{leave.leaveType}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Reason:</p>
                <p className='font-medium'>{leave.reason}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Department:</p>
                <p className='font-medium'>{leave.employeeId.department.department_name}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Start Date:</p>
                <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>End Date:</p>
                <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>
                  {leave.status === "pending" ? "Action" : "Status   :"}
                 </p>
                 {leave.status === "Pending" ? (
                  <div className='flex space-x-2'>
                    <button className='px-2 py-1 bg-teal-500 hover:bg-teal-600 rounded' onClick={()=>ChangeStatus(leave._id,"Approved")}>Approve</button>
                    <button className='px-2 py-1 bg-red-400 hover:bg-red-700 rounded'   onClick={()=>ChangeStatus(leave._id,"Rejected")}>Reject</button>
                  </div>
                 ):
                 <p className='font-medium'>{leave.status}</p>
                 }
                
              </div>
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            {/* <button
              onClick={handleDelete}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            >
              Delete Employee
            </button> */}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Detail;
