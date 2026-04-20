import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Use the context function to clear state and localStorage safely
    navigate("/");
  };

  // Format role for display (e.g., "SPACE_MANAGER" -> "Space Manager")
  const formatRole = (role) => {
    if (!role) return "";
    return role.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">
        Synapse
      </h1>

      <div className="flex items-center gap-6">
        {user && (
          <span className="font-medium bg-blue-700 px-3 py-1 rounded-md">
            {user.name} <span className="text-blue-200 text-sm ml-1">({formatRole(user.role)})</span>
          </span>
        )}

        <div className="hidden md:flex gap-4">
          {user?.role === "ADMIN" && (
            <Link to="/admin" className="hover:text-gray-200 transition-colors">
              Dashboard
            </Link>
          )}

          {user?.role === "MEMBER" && (
            <>
              <Link to="/dashboard" className="hover:text-gray-200 transition-colors">
                Dashboard
              </Link>
              <Link to="/bookdesk" className="hover:text-gray-200 transition-colors">
                Book Desk
              </Link>
            </>
          )}

          {/* Updated to SPACE_MANAGER */}
          {user?.role === "SPACE_MANAGER" && (
            <Link to="/manager" className="hover:text-gray-200 transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* Logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-medium shadow-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;