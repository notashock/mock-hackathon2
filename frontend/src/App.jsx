import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import BookDesk from "./pages/BookDesk";
import BookingHistory from "./pages/BookingHistory";
import ManageAmenities from "./pages/ManageAmenities";
import RequestAmenity from "./pages/RequestAmenity";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            {/* Public / Auth */}
            <Route path="/" element={<Login />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Member Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="MEMBER">
                  <MemberDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookdesk"
              element={
                <ProtectedRoute role="MEMBER">
                  <BookDesk />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-amenity"
              element={
                <ProtectedRoute role="MEMBER">
                  <RequestAmenity />
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

            {/* Space Manager Routes */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute role="SPACE_MANAGER">
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/amenities"
              element={
                <ProtectedRoute role="SPACE_MANAGER">
                  <ManageAmenities />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for bad URLs */}
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;