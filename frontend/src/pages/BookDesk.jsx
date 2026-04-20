import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function BookDesk() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [desks, setDesks] = useState([]);

  const [bookingData, setBookingData] = useState({
    deskId: "",
    bookingDate: "",
    userId: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchWorkspaces();
    fetchAvailableDesks(); 

  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      fetchDesks(selectedWorkspace); 
    }
  }, [selectedWorkspace]);

  const fetchAvailableDesks = async () => {
    try {
      const res = await API.get("/desks");
      setDesks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);

      if (res.data.length > 0) {
        setSelectedWorkspace(res.data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDesks = async (id) => {
    try {
      const res = await API.get(`/desks?workspaceId=${id}`);
      setDesks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
      userId: user.id,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await API.post("/bookings", bookingData);
      alert("Desk booked successfully");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Book Desk
          </h1>

          <div className="bg-white p-6 rounded-xl shadow w-96">
            <form onSubmit={handleBooking}>
              
              <select
                value={selectedWorkspace}
                onChange={(e) =>
                  setSelectedWorkspace(e.target.value)
                }
                className="w-full border p-2 mb-3 rounded"
              >
                <option value="">Select Workspace</option>
                {workspaces.map((ws) => (
                  <option key={ws.id} value={ws.id}>
                    {ws.name}
                  </option>
                ))}
              </select>

              <select
                name="deskId"
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              >
                <option value="">Select Desk</option>
                {desks.map((desk) => (
                  <option key={desk.id} value={desk.id}>
                    {desk.deskNumber}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="bookingDate"
                onChange={handleChange}
                className="w-full border p-2 mb-4 rounded"
                required
              />

              <button className="w-full bg-blue-500 text-white p-2 rounded">
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