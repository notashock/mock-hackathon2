import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/axiosConfig";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    desks: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchRecentBookings();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/admin/dashboard");

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const res = await API.get("/admin/bookings/recent");
      setRecentBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Admin Panel
        </h1>

        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Users</li>
          <li>Bookings</li>
          <li>Reports</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-5 rounded shadow">
            <h3>Total Users</h3>
            <p className="text-2xl font-bold">{stats.users}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Total Bookings</h3>
            <p className="text-2xl font-bold">{stats.bookings}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Available Desks</h3>
            <p className="text-2xl font-bold">{stats.desks}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Revenue</h3>
            <p className="text-2xl font-bold">₹{stats.revenue}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl mb-4">Recent Bookings</h3>

          <table className="w-full text-center">
            <thead>
              <tr className="border-b">
                <th>User</th>
                <th>Desk</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((item) => (
                <tr key={item.id} className="border-b">
                  <td>{item.userName}</td>
                  <td>{item.deskNumber}</td>
                  <td>{item.bookingDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;