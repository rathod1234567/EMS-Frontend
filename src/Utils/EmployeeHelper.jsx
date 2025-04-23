
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    sortable: true,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.department_name,
    sortable: true,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("https://ems-backend-1-nyjv.onrender.com/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// employee for salary form

export const getEmployees = async (_id) => {
  let employees;
  try {
    const response = await axios.get(`https://ems-backend-1-nyjv.onrender.com/api/add_employee/department/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`https://ems-backend-2-a7rt.onrender.com/api/add_employee/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        alert("Employee deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        className="px-3 py-1 bg-green-600 text-white rounded"
        onClick={() => navigate(`/admin_dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin_dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button className="px-3 py-1 bg-yellow-600 text-white rounded"
       onClick={()=> navigate(`/admin_dashboard/employees/salary/${_id}`)}>Salary</button>

      <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={()=>navigate(`/admin_dashboard/employees/leaves/${_id}`)}>Leave</button>
      <button
        className="px-3 py-1 bg-red-800 text-white rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
