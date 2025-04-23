
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns } from "../../Utils/LeaveHelper";
import LeaveButtons from "../../Utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "https://ems-backend-2-a7rt.onrender.com/api/leaves",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.department_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons _id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } 
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter(leave => 
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter(leave => 
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  // Custom styles for DataTable
  const customStyles = {
    table: {
      style: {
        minWidth: '100%',
        border: '4px solid #e5e7eb',
        borderRadius: '0.5rem', 
        backgroundColor: '#ffffff',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-3 sm:p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-4">
            <input
              type="text"
              placeholder="Search By Employee Id"
              className="w-full sm:w-auto px-3 sm:px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onChange={filterByInput}
            />

            <div className="grid grid-cols-3 w-full sm:w-auto sm:flex sm:space-x-3 gap-2">
              <button 
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded text-sm sm:text-base transition" 
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button 
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded text-sm sm:text-base transition" 
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button 
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded text-sm sm:text-base transition"
                onClick={() => filterByButton("Reject")}
              >
                Rejected
              </button>
            </div>
          </div>
          
          <div className="mt-3 overflow-x-auto">
            <DataTable 
              columns={columns} 
              data={filteredLeaves} 
              pagination 
              responsive 
              customStyles={customStyles}
              persistTableHead
            />  
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-pulse">Loading...</div>
        </div>
      )}
    </>
  );
};

export default Table;