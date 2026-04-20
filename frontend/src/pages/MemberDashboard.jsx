import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MemberDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    cancelled: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");

      // logged in member bookings only
      const myBookings = res.data.filter(
        (item) => item.userId === user.id
      );

      setBookings(myBookings);

      setStats({
        total: myBookings.length,
        confirmed: myBookings.filter(
          (b) => b.status === "CONFIRMED"
        ).length,
        cancelled: myBookings.filter(
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
            Welcome {user?.name}
          </h1>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">Total Bookings</h3>
              <p className="text-2xl font-bold">
                {stats.total}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">Confirmed</h3>
              <p className="text-2xl font-bold text-green-500">
                {stats.confirmed}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-gray-500">Cancelled</h3>
              <p className="text-2xl font-bold text-red-500">
                {stats.cancelled}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              My Bookings
            </h2>

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
                    <td className="py-2">
                      {booking.deskNumber}
                    </td>
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
              <p className="text-gray-500 mt-4">
                No bookings found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;