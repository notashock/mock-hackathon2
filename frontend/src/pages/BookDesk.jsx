import { useEffect, useState } from "react";
import axios from "axios";

function BookDesk() {
  const [desks, setDesks] = useState([]);
  const [bookingData, setBookingData] = useState({
    deskId: "",
    bookingDate: "",
  });

  useEffect(() => {
    fetchAvailableDesks();
  }, []);

  const fetchAvailableDesks = async () => {
    const res = await axios.get("http://localhost:8080/api/desks");
    setDesks(res.data);
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBook = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8080/api/bookings",
      bookingData
    );

    alert("Desk Booked Successfully");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Book Desk</h1>

      <form
        onSubmit={handleBook}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <select
          name="deskId"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        >
          <option>Select Desk</option>

          {desks.map((desk) => (
            <option key={desk.id} value={desk.id}>
              {desk.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="bookingDate"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookDesk;