import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function MemberDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    cancelled: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/${user.id}`);

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

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
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

      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">
          Welcome {user?.name}
        </h2>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded shadow">
            <h3>Total Bookings</h3>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Confirmed</h3>
            <p className="text-2xl font-bold text-green-500">
              {stats.upcoming}
            </p>
          </div>

          <div className="bg-white p-5 rounded shadow">
            <h3>Cancelled</h3>
            <p className="text-2xl font-bold text-red-500">
              {stats.cancelled}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl mb-4">My Bookings</h3>

          <table className="w-full text-center">
            <thead>
              <tr className="border-b">
                <th>Desk</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b">
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

                  <td>
                    {booking.status !== "CANCELLED" && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
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
            <p className="text-gray-500 mt-4">
              No bookings found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;