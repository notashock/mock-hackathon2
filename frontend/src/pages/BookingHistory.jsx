import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ GET /api/bookings
  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");

      // only logged in member bookings
      const myBookings = res.data.filter(
        (item) => item.userId === user.id
      );

      setBookings(myBookings);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ PUT /api/bookings/{id}/cancel
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
            Booking History
          </h1>

          <div className="bg-white p-6 rounded-xl shadow">
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
              <p className="text-gray-500 mt-4 text-center">
                No bookings found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;