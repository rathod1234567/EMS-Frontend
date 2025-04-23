
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../Utils/DepartmentHelper';
import axios from 'axios';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('https://ems-backend-2-a7rt.onrender.com/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          department_name: dep.department_name,
          action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
        }));

        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.department_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  
  const customStyles = {
    table: {
      style: {
        width: '100%',
        border: '4px solid #e5e7eb',
        borderRadius: '0.5rem', 
        backgroundColor: '#ffffff', 
       
      },
    },
    tableWrapper: {
      style: {
        overflowX: 'auto', 
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f3f4f6', 
        fontSize: '0.875rem', 
        fontWeight: '600',
        borderBottom: '1px solid #e5e7eb', 
      },
    },
    headCells: {
      style: {
        padding: '0.75rem',
        whiteSpace: 'nowrap',
      },
    },
    cells: {
      style: {
        padding: '0.75rem', 
        fontSize: '0.875rem', 
        borderBottom: '1px solid #e5e7eb', 
        '@media (max-width: 640px)': {
          fontSize: '0.75rem', 
          padding: '0.2rem',
        },
      },
    },
    rows: {
      style: {
        fontSize: '0.875rem', 
        '@media (max-width: 640px)': {
          fontSize: '0.75rem', 
        },
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e5e7eb',
        paddingTop: '0.625rem',
        padding: '0.75rem', 
        fontSize: '0.875rem', 
        '@media (max-width: 640px)': {
          fontSize: '0.75rem',
          padding: '0.5rem',
        },
      },
    },
  };

  return (
    <div className="md:ml-30  flex justify-center items-start p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
      {depLoading ? (
        <div className="flex items-center justify-center h-screen text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Manage Departments</h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Department"
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={filterDepartments}
            />
            <Link
              to="/admin_dashboard/add_department"
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-center text-white font-semibold transition"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5 bg-white rounded-lg">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              responsive
              customStyles={customStyles}
              className="border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;