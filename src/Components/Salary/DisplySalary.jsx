
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DisplySalary = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`https://ems-backend-2-a7rt.onrender.com/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (e) => {
        const q = e.target.value;
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filteredSalaries == null ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse text-gray-600">Loading...</div>
                </div>
            ) : (
                <div className='p-3 sm:p-5'>
                    <div className='text-center mb-4 sm:mb-6'>
                        <h2 className='text-xl sm:text-2xl font-bold'>SALARY HISTORY</h2>
                    </div>
                    <div className='flex justify-end my-2 sm:my-3'>
                        <input 
                            type="text" 
                            placeholder='Search By Emp Id'
                            onChange={filterSalaries}
                            className="px-3 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    {filteredSalaries.length > 0 ? (
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className='w-full text-sm text-left text-gray-500'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                                    <tr>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>SNO</th>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>EMP ID</th>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>Salary</th>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>Allowance</th>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>Deduction</th>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>Total</th>
                                        <th className='px-2 py-2 sm:px-6 sm:py-3'>Pay Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSalaries.map((salary) => (
                                        <tr key={salary.id} className='bg-white border-b hover:bg-gray-50'>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3'>{sno++}</td>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3'>{salary.employeeId.employeeId}</td>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3'>{salary.basicSalary}</td>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3'>{salary.allowances}</td>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3'>{salary.deductions}</td>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3 font-medium'>{salary.netSalary}</td>
                                            <td className='px-2 py-2 sm:px-6 sm:py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-32 bg-gray-50 rounded-md border border-gray-200">
                            <p className="text-gray-500">No Records Found</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default DisplySalary;