import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMembers: 0,
    totalBookings: 0,
    confirmed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchUsers();
    fetchMembers();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);

      setStats((prev) => ({
        ...prev,
        totalUsers: res.data.length,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await API.get("/users?role=MEMBER");
      setMembers(res.data);

      setStats((prev) => ({
        ...prev,
        totalMembers: res.data.length,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);

      setStats((prev) => ({
        ...prev,
        totalBookings: res.data.length,
        confirmed: res.data.filter(
          (b) => b.status === "CONFIRMED"
        ).length,
        cancelled: res.data.filter(
          (b) => b.status === "CANCELLED"
        ).length,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/confirm`);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow">
              <h3>Total Users</h3>
              <p className="text-2xl font-bold">
                {stats.totalUsers}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>Members</h3>
              <p className="text-2xl font-bold text-blue-500">
                {stats.totalMembers}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>Bookings</h3>
              <p className="text-2xl font-bold">
                {stats.totalBookings}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>Confirmed</h3>
              <p className="text-2xl font-bold text-green-500">
                {stats.confirmed}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3>Cancelled</h3>
              <p className="text-2xl font-bold text-red-500">
                {stats.cancelled}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">
              All Users
            </h2>

            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Booking Management
            </h2>

            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="py-2">User</th>
                  <th>Desk</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-2">
                      {booking.userName}
                    </td>
                    <td>{booking.deskNumber}</td>
                    <td>{booking.bookingDate}</td>

                    <td
                      className={
                        booking.status === "CONFIRMED"
                          ? "text-green-500"
                          : booking.status === "CANCELLED"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                    >
                      {booking.status}
                    </td>

                    <td className="space-x-2">
                      {booking.status !== "CONFIRMED" && (
                        <button
                          onClick={() =>
                            confirmBooking(booking.id)
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Confirm
                        </button>
                      )}

                      {booking.status !== "CANCELLED" && (
                        <button
                          onClick={() =>
                            cancelBooking(booking.id)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {bookings.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                No bookings found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;