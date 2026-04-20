import { useEffect, useState } from "react";
import axios from "axios";

function MemberDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/bookings/member/1"
      );

      setBookings(res.data);

      setStats({
        total: res.data.length,
        upcoming: res.data.filter(
          (b) => b.status === "CONFIRMED"
        ).length,
        cancelled: res.data.filter(
          (b) => b.status === "CANCELLED"
        ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Member Panel
        </h1>

        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Book Desk</li>
          <li>My Bookings</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">
          Welcome Member
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded shadow">
            <h3>Total Bookings</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Upcoming</h3>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Cancelled</h3>
            <p className="text-2xl font-bold">{stats.cancelled}</p>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl mb-4">My Bookings</h3>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th>Desk</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b text-center">
                  <td>{booking.deskNumber}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;