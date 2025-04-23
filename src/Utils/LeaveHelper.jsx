
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "60px",
    sortable: true,
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "100px",
    grow: 0.5,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "120px",
    grow: 1,
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
    width: "130px",
    grow: 1,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    width: "150px",
    grow: 1,
    hide: "sm",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    sortable: true,
    width: "70px",
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "110px",
    cell: row => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.status === 'Approved' ? 'bg-green-100 text-green-800' :
        row.status === 'Reject' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {row.status}
      </span>
    ),
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    width: "100px",
  },
];

const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate(null);

  const handleView = () => {
    navigate(`/admin_dashboard/leaves/${_id}`);
  };
  
  return (
    <button 
      className="px-2 sm:px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600 transition text-sm sm:text-base whitespace-nowrap" 
      onClick={() => handleView()}
    >
      View
    </button>
  );
};

export default LeaveButtons;