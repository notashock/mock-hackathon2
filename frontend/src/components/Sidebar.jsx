import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-5 border-r border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        Dashboard
      </h2>

      <ul className="space-y-4">
        {user?.role === "ADMIN" && (
          <>
            {/* All Admin features are managed directly on the Admin Dashboard */}
            <li><Link to="/admin" className="hover:text-blue-500 font-medium">Admin Dashboard</Link></li>
          </>
        )}

        {user?.role === "MEMBER" && (
          <>
            <li><Link to="/dashboard" className="hover:text-blue-500 font-medium">Member Dashboard</Link></li>
            <li><Link to="/bookdesk" className="hover:text-blue-500 font-medium">Book Desk</Link></li>
            <li><Link to="/booking-history" className="hover:text-blue-500 font-medium">Booking History</Link></li>
          </>
        )}

        {user?.role === "SPACE_MANAGER" && (
          <>
            {/* All Manager features (Workspaces, Desks, Amenities) are handled on this single page */}
            <li><Link to="/manager" className="hover:text-blue-500 font-medium">Manager Dashboard</Link></li>
          </>
        )}

        <li className="pt-8 mt-8 border-t border-gray-200">
          <button 
            onClick={handleLogout} 
            className="text-red-500 font-semibold hover:text-red-700 w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;