
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const { id } = useParams();
  
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`https://ems-backend-2-a7rt.onrender.com/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  return (
    <div className='p-3 sm:p-6'>
      <div className="text-center mb-4">
        <h3 className="text-xl sm:text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="w-full sm:w-auto px-3 sm:px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {user.role === "employee" && (
          <Link
            to="/employee_dashboard/add_leave"
            className="w-full sm:w-auto text-center px-3 sm:px-4 py-1 bg-indigo-600 rounded text-white hover:bg-indigo-700 transition"
          >
            Add New Leave
          </Link>
        )}
      </div>

      <div className="mt-4 sm:mt-7 overflow-x-auto">
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
            <tr>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>SNO</th>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>Leave Type</th>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>From</th>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>To</th>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>Description</th>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>Applied Date</th>
              <th className='px-2 sm:px-6 py-2 sm:py-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id} className='bg-white border-b hover:bg-gray-50'>
                <td className='px-2 sm:px-6 py-2 sm:py-3'>{sno++}</td>
                <td className='px-2 sm:px-6 py-2 sm:py-3'>{leave.leaveType}</td>
                <td className='px-2 sm:px-6 py-2 sm:py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className='px-2 sm:px-6 py-2 sm:py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className='px-2 sm:px-6 py-2 sm:py-3 truncate max-w-[150px]'>{leave.reason}</td>
                <td className='px-2 sm:px-6 py-2 sm:py-3'>{new Date(leave.appliedAt).toLocaleDateString()}</td>
                <td className='px-2 sm:px-6 py-2 sm:py-3'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    leave.status === 'Reject' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {leave.status}
                  </span>
                </td>            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;