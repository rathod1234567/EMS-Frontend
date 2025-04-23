
import React, { useEffect, useState } from 'react';
import ReportCard from './ReportCard';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const AdminReport = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://ems-backend-2-a7rt.onrender.com/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(summary.data);
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Dashboard Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <ReportCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-indigo-600" />
        <ReportCard icon={<FaBuilding />} text="Total Department" number={summary.totalDepartments} color="bg-blue-500" />
        <ReportCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary} color="bg-purple-600" />
      </div>
      <div className="mt-8 sm:mt-10 md:mt-12">
        <h4 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Leave Details</h4>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <ReportCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} color="bg-cyan-600" />
          <ReportCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} color="bg-emerald-600" />
          <ReportCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} color="bg-amber-500" />
          <ReportCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} color="bg-rose-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminReport;