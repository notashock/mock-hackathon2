import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axiosConfig";
import { BookingContext } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

function BookDesk() {
  const { createBooking } = useContext(BookingContext);
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [desks, setDesks] = useState([]);
  const [error, setError] = useState("");

  const [bookingData, setBookingData] = useState({
    deskId: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      fetchDesks(selectedWorkspace);
    } else {
      setDesks([]);
    }
  }, [selectedWorkspace]);

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDesks = async (id) => {
    try {
      const res = await API.get(`/desks?workspaceId=${id}`);
      // Filter out unavailable desks if needed, or show all
      setDesks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    // Format for Spring Boot LocalDateTime (YYYY-MM-DDTHH:mm:ss)
    const payload = {
      deskId: bookingData.deskId,
      bookingDate: bookingData.bookingDate,
      startTime: `${bookingData.bookingDate}T${bookingData.startTime}:00`,
      endTime: `${bookingData.bookingDate}T${bookingData.endTime}:00`,
    };

    try {
      await createBooking(payload);
      alert("Desk booked successfully!");
      navigate("/booking-history");
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Booking failed. Check for overlapping times or duration rules."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Book Desk</h1>

          <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workspace</label>
                <select
                  value={selectedWorkspace}
                  onChange={(e) => setSelectedWorkspace(e.target.value)}
                  className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Workspace</option>
                  {workspaces.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      {ws.workspaceName} ({ws.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desk</label>
                <select
                  name="deskId"
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={!selectedWorkspace}
                >
                  <option value="">Select Desk</option>
                  {desks.map((desk) => (
                    <option key={desk.id} value={desk.id}>
                      Desk #{desk.deskNumber} - {desk.deskType.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    onChange={handleChange}
                    className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 pb-2">
                * Note: Bookings must be between 1 and 12 hours duration.
              </p>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition-colors">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDesk;