
import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../Utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const empls = await getEmployees(e.target.value);
    setEmployees(empls);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://ems-backend-2-a7rt.onrender.com/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin_dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-10 bg-white p-4 sm:p-8 rounded-md shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Add Salary</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.department_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="basicSalary"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="basic salary"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="allowances"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowances"
                  placeholder="allowances"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="deductions"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="deductions"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="payDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pay Dates
                </label>
                <input
                  type="date"
                  name="payDate"
                  placeholder="payDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >
              Update Salary
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-600">Loading...</div>
        </div>
      )}
    </>
  );
};

export default AddSalary;