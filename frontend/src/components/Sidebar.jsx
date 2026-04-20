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
            <li>
              <Link to="/admin" className="hover:text-blue-500 font-medium transition-colors">
                Admin Dashboard
              </Link>
            </li>
          </>
        )}

        {user?.role === "MEMBER" && (
          <>
            <li>
              <Link to="/dashboard" className="hover:text-blue-500 font-medium transition-colors">
                Member Dashboard
              </Link>
            </li>
            <li>
              <Link to="/bookdesk" className="hover:text-blue-500 font-medium transition-colors">
                Book Desk
              </Link>
            </li>
            <li>
              <Link to="/request-amenity" className="hover:text-blue-500 font-medium transition-colors">
                Request Amenity
              </Link>
            </li>
            <li>
              <Link to="/booking-history" className="hover:text-blue-500 font-medium transition-colors">
                Booking History
              </Link>
            </li>
          </>
        )}

        {user?.role === "SPACE_MANAGER" && (
          <>
            <li>
              <Link to="/manager" className="hover:text-blue-500 font-medium transition-colors">
                Manager Dashboard
              </Link>
            </li>
            <li>
              <Link to="/amenities" className="hover:text-blue-500 font-medium transition-colors">
                Manage Amenities
              </Link>
            </li>
          </>
        )}

        <li className="pt-8 mt-8 border-t border-gray-200">
          <button 
            onClick={handleLogout} 
            className="text-red-500 font-semibold hover:text-red-700 w-full text-left transition-colors"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;