// Sidebar.jsx (Role Based Sidebar)
import { Link } from "react-router-dom";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        Dashboard
      </h2>

      <ul className="space-y-4">
        {/* ADMIN */}
        {user?.role === "ADMIN" && (
          <>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li><Link to="/users">Manage Users</Link></li>
            <li><Link to="/reports">Reports</Link></li>
          </>
        )}

        {/* MEMBER */}
        {user?.role === "MEMBER" && (
          <>
            <li><Link to="/member">Member Dashboard</Link></li>
            <li><Link to="/bookdesk">Book Desk</Link></li>
            <li><Link to="/booking-history">Booking History</Link></li>
          </>
        )}

        {/* MANAGER */}
        {user?.role === "MANAGER" && (
          <>
            <li><Link to="/manager">Manager Dashboard</Link></li>
            <li><Link to="/workspace">Workspace</Link></li>
            <li><Link to="/amenities">Amenities</Link></li>
          </>
        )}

        {/* Logout */}
        <li>
          <Link to="/" className="text-red-500 font-semibold">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;