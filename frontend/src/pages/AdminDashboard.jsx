import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Utilizing the actual Phase 4 Analytics APIs
  const [deskUtilization, setDeskUtilization] = useState([]);
  const [amenityStats, setAmenityStats] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMembers: 0,
    totalBookings: 0,
    confirmed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchUsers();
    fetchBookings();
    fetchAnalytics();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
      
      const membersCount = res.data.filter(u => u.role === "MEMBER").length;

      setStats((prev) => ({
        ...prev,
        totalUsers: res.data.length,
        totalMembers: membersCount
      }));
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);

      setStats((prev) => ({
        ...prev,
        totalBookings: res.data.length,
        confirmed: res.data.filter((b) => b.bookingStatus === "CONFIRMED").length,
        cancelled: res.data.filter((b) => b.bookingStatus === "CANCELLED").length,
      }));
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const utilRes = await API.get("/admin/analytics/desks/utilization");
      setDeskUtilization(utilRes.data);

      const amenityRes = await API.get("/admin/analytics/amenities/usage");
      setAmenityStats(amenityRes.data);
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
    }
  };

  const confirmBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/confirm`);
      fetchBookings();
      fetchAnalytics(); // Refresh stats when a booking changes
    } catch (error) {
      console.error("Failed to confirm booking", error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings();
      fetchAnalytics(); // Refresh stats when a booking changes
    } catch (error) {
      console.error("Failed to cancel booking", error);
    }
  };

  const formatRole = (role) => {
    return role.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-70px)]">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Admin Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Users</h3>
              <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-indigo-500">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Members</h3>
              <p className="text-3xl font-bold mt-2 text-indigo-600">{stats.totalMembers}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-500">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Bookings</h3>
              <p className="text-3xl font-bold mt-2">{stats.totalBookings}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Confirmed</h3>
              <p className="text-3xl font-bold mt-2 text-green-500">{stats.confirmed}</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border-l-4 border-red-500">
              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Cancelled</h3>
              <p className="text-3xl font-bold mt-2 text-red-500">{stats.cancelled}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Analytics: Desk Utilization */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Workspace Utilization</h2>
              <div className="space-y-4">
                {deskUtilization.map((workspace) => (
                  <div key={workspace.workspaceId} className="border-b pb-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{workspace.workspaceName}</span>
                      <span className="text-sm font-semibold text-blue-600">{workspace.utilizationPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${workspace.utilizationPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {workspace.uniqueDesksBooked} / {workspace.totalDesks} desks booked
                    </p>
                  </div>
                ))}
                {deskUtilization.length === 0 && <p className="text-gray-500 text-sm">No workspace data available.</p>}
              </div>
            </div>

            {/* Analytics: Top Amenities */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Most Used Amenities</h2>
              <ul className="space-y-3">
                {amenityStats.map((amenity, index) => (
                  <li key={amenity.amenityId} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded mr-3 text-sm">#{index + 1}</span>
                      <span className="font-medium">{amenity.amenityName}</span>
                    </div>
                    <span className="text-gray-600 font-semibold">{amenity.totalReservations} uses</span>
                  </li>
                ))}
                {amenityStats.length === 0 && <p className="text-gray-500 text-sm">No amenity data available.</p>}
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Booking Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Desk</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium">{booking.userName}</td>
                      <td className="py-3 px-4">#{booking.deskNumber}</td>
                      <td className="py-3 px-4">{booking.bookingDate}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                        {new Date(booking.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          booking.bookingStatus === "CONFIRMED" ? "text-green-600" : 
                          booking.bookingStatus === "CANCELLED" ? "text-red-600" : "text-yellow-600"
                        }`}
                      >
                        {booking.bookingStatus}
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        {booking.bookingStatus !== "CONFIRMED" && booking.bookingStatus !== "CANCELLED" && (
                          <button
                            onClick={() => confirmBooking(booking.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {booking.bookingStatus !== "CANCELLED" && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-500">
                        No bookings found in the system.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">All Registered Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium">{u.name}</td>
                      <td className="py-3 px-4 text-gray-600">{u.email}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700">{formatRole(u.role)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;