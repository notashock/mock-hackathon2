import { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BookingContext } from "../context/BookingContext";

function BookingHistory() {
  const { bookings, fetchBookings, cancelBooking } = useContext(BookingContext);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Helper to format time safely
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Booking History</h1>

          <div className="bg-white p-6 rounded-xl shadow overflow-hidden">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-700">
                  <th className="py-3 font-semibold">Desk</th>
                  <th className="py-3 font-semibold">Date</th>
                  <th className="py-3 font-semibold">Time</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3">#{booking.deskNumber}</td>
                    <td className="py-3">{booking.bookingDate}</td>
                    <td className="py-3 text-sm text-gray-600">
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </td>
                    <td
                      className={`py-3 font-semibold ${
                        booking.bookingStatus === "CONFIRMED"
                          ? "text-green-500"
                          : booking.bookingStatus === "CANCELLED"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {booking.bookingStatus}
                    </td>
                    <td className="py-3">
                      {booking.bookingStatus !== "CANCELLED" && booking.bookingStatus !== "COMPLETED" && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow-sm transition-colors text-sm"
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
              <p className="text-gray-500 mt-6 pb-2 text-center">
                You have no booking history.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;