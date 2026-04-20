import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/axiosConfig";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await API.get("/bookings/member/1");
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    await API.delete(`/bookings/${id}`);

    fetchBookings();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Booking History
      </h1>

      <div className="bg-white p-6 rounded shadow-md">
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
            {bookings.map((item) => (
              <tr key={item.id} className="border-b">
                <td>{item.deskNumber}</td>
                <td>{item.bookingDate}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() =>
                      cancelBooking(item.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory;