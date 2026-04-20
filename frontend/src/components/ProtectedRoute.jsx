import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  // 1. If not logged in at all, kick to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. If logged in but lacks the specific role required for this route
  if (role && user.role !== role) {
    // Bounce them to their respective safe zone
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "SPACE_MANAGER") return <Navigate to="/manager" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Authorized
  return children;
}

export default ProtectedRoute;