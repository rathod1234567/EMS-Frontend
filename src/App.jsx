
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import PrivateRoutes from './Utils/PrivateRoutes';
import RoleBaseRoute from './Utils/RoleBaseRoute';
import AdminReport from './Components/Dashboard/AdminReport';
import Department from './Components/Department/Department';
import AddDepartment from './Components/Department/AddDepartment';
import EditDepartment from './Components/Department/EditDepartment';
import EmployeeList from './Components/Employee/EmployeeList';
import AddEmployee from './Components/Employee/AddEmployee';
import EmployeeView from './Components/Employee/EmployeeView';
import EditEmployee from './Components/Employee/EditEmployee';
import AddSalary from './Components/Salary/AddSalary';
import DisplySalary from './Components/Salary/DisplySalary';
import ReportCard from './Components/EmployeeDashboard/ReportCard';
import LeaveList from './Components/Leave/LeaveList';
import AddLeave from './Components/Leave/AddLeave';
import Setting from './Components/EmployeeDashboard/Setting';
import Table from './Components/Leave/Table';
import Detail from './Components/Leave/Detail';
import Home from './Components/LandingPage/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />


        <Route path='/login' element={<Login />} />

        <Route path='/admin_dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoute requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoute>
          </PrivateRoutes>
        }>
          <Route index element={<AdminReport />} />

          <Route path='/admin_dashboard/departments' element={<Department />} />
          <Route path='/admin_dashboard/add_department' element={<AddDepartment />} />
          <Route path='/admin_dashboard/department/:id' element={<EditDepartment />} />

          <Route path='/admin_dashboard/employees' element={<EmployeeList />} />
          <Route path='/admin_dashboard/add_employee' element={<AddEmployee />} />
          <Route path='/admin_dashboard/employees/:id' element={<EmployeeView />} />
          <Route path='/admin_dashboard/employees/edit/:id' element={<EditEmployee />} />
          <Route path='/admin_dashboard/employees/salary/:id' element={<DisplySalary />} />

          <Route path='/admin_dashboard/salary/add' element={<AddSalary />} />

          <Route path='/admin_dashboard/leaves' element={<Table />} />
          <Route path='/admin_dashboard/leaves/:id' element={<Detail />} />
          <Route path='/admin_dashboard/employees/leaves/:id' element={<LeaveList />} />
          <Route path='/admin_dashboard/setting' element ={<Setting />} ></Route>

        </Route>

        <Route path='/employee_dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoute requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoute>
          </PrivateRoutes>
        }>
          <Route index element={<ReportCard />} />
          <Route path='/employee_dashboard/profile/:id' element={<EmployeeView />} />
          <Route path='/employee_dashboard/leaves/:id' element={<LeaveList />} />
          <Route path='/employee_dashboard/leaves' element={<LeaveList />} />  

          <Route path='/employee_dashboard/add_leave' element={<AddLeave />} />
          <Route path='/employee_dashboard/salary/:id' element={<DisplySalary />} />
          <Route path='/employee_dashboard/setting' element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
