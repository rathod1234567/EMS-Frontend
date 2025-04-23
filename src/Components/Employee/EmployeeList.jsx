
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../Utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "https://ems-backend-2-a7rt.onrender.com/api/add_employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            department_name: emp.department?.department_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`https://ems-backend-2-a7rt.onrender.com/${emp.userId?.profileImage || "default.jpg"}`}
                alt="Profile"
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        } else {
          alert("Something went wrong while fetching employees.");
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handlefilter = (e) => {
    const value = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value)
    );
    setFilteredEmployee(records);
  };

  // Custom styles for DataTable to make it responsive without scrolling
  const customStyles = {
    table: {
      style: {
        minWidth: '100%',
      },
    },
    headRow: {
      style: {
        // backgroundColor: '#f3f4f6',
        minHeight: '50px',
        border: '4px solid #e5e7eb',
        borderRadius: '0.5rem', 
        backgroundColor: '#ffffff',
      },
    },
    headCells: {
      style: {
        fontSize: '0.875rem',
        fontWeight: 'bold',
        padding: '8px',
      },
    },
    cells: {
      style: {
        padding: '8px',
        fontSize: '0.875rem',
      },
    },
    rows: {
      style: {
        minHeight: '60px',
      },
    },
  };

  return (
    <div className="p-3 sm:p-6 max-w-full">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <input
          type="text"
          placeholder="Search by Department"
          className="px-4 py-2 border rounded w-full sm:w-auto"
          onChange={handlefilter}
        />
        <Link
          to="/admin_dashboard/add_employee"
          className="px-4 py-2 bg-indigo-600 rounded text-white text-center w-full sm:w-auto"
        >
          Add New Employee
        </Link>
      </div>

      <div className="mt-6 w-full max-w-full">
        {/* Wrap DataTable in a responsive container that adapts to screen size */}
        <div className="max-w-full overflow-x-auto md:overflow-visible">
          <DataTable 
            columns={columns} 
            data={filteredEmployee}
            pagination
            customStyles={customStyles}
            progressPending={empLoading}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            className="w-full"
            dense
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            noDataComponent={
              <div className="p-4">No employees found</div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;