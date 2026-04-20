import { useEffect, useState, useContext } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

function MemberDashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Use the specific endpoint we built for members
      const res = await API.get("/bookings/my-bookings");
      const myBookings = res.data;

      setBookings(myBookings);

      setStats({
        total: myBookings.length,
        confirmed: myBookings.filter((b) => b.bookingStatus === "CONFIRMED").length,
        cancelled: myBookings.filter((b) => b.bookingStatus === "CANCELLED").length,
      });
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Failed to cancel booking", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Welcome, {user?.name || "Member"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">Total Bookings</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">Confirmed</h3>
              <p className="text-2xl font-bold text-green-500">{stats.confirmed}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">Cancelled</h3>
              <p className="text-2xl font-bold text-red-500">{stats.cancelled}</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

            <table className="w-full text-center">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Desk</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-2">{booking.deskNumber}</td>
                    <td>{booking.bookingDate}</td>
                    <td
                      className={
                        booking.bookingStatus === "CONFIRMED"
                          ? "text-green-500 font-medium"
                          : booking.bookingStatus === "CANCELLED"
                          ? "text-red-500 font-medium"
                          : "text-yellow-500 font-medium"
                      }
                    >
                      {booking.bookingStatus}
                    </td>
                    <td>
                      {booking.bookingStatus !== "CANCELLED" && 
                       booking.bookingStatus !== "COMPLETED" && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="bg-red-500 hover:bg-red-600 transition-colors text-white px-3 py-1 rounded text-sm"
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
              <p className="text-gray-500 text-center mt-6">
                No bookings found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;