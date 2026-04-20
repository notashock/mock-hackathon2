import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        Desk Booking System
      </h1>

      <div className="flex items-center gap-5">
        <span className="font-medium">
          {user?.name} ({user?.role})
        </span>

        {user?.role === "ADMIN" && (
          <Link to="/admin" className="hover:text-gray-200">
            Dashboard
          </Link>
        )}

        {user?.role === "MEMBER" && (
          <>
            <Link to="/member" className="hover:text-gray-200">
              Dashboard
            </Link>

            <Link to="/bookdesk" className="hover:text-gray-200">
              Book Desk
            </Link>
          </>
        )}

        {user?.role === "MANAGER" && (
          <Link to="/manager" className="hover:text-gray-200">
            Dashboard
          </Link>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;