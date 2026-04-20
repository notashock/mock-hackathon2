import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

import BookDesk from "./pages/BookDesk";
import BookingHistory from "./pages/BookingHistory";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Member */}
        <Route
          path="/member"
          element={
            <ProtectedRoute role="MEMBER">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute role="MANAGER">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Member Pages */}
        <Route
          path="/bookdesk"
          element={
            <ProtectedRoute role="MEMBER">
              <BookDesk />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-history"
          element={
            <ProtectedRoute role="MEMBER">
              <BookingHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;