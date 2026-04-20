import { useEffect, useState, useContext } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BookingContext } from "../context/BookingContext";

function RequestAmenity() {
  const { bookings, fetchBookings } = useContext(BookingContext);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    bookingId: "",
    amenityId: "",
  });

  useEffect(() => {
    fetchBookings(); // Fetch member's bookings
    fetchAvailableAmenities();
  }, [fetchBookings]);

  const fetchAvailableAmenities = async () => {
    try {
      const res = await API.get("/amenities");
      // Only show available amenities
      setAmenities(res.data.filter(a => a.availabilityStatus === "AVAILABLE"));
    } catch (err) {
      console.error("Failed to fetch amenities", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/amenity-reservations", {
        bookingId: parseInt(formData.bookingId),
        amenityId: parseInt(formData.amenityId),
      });
      setSuccess("Amenity requested successfully! Awaiting manager approval.");
      setFormData({ bookingId: "", amenityId: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request amenity.");
    } finally {
      setLoading(false);
    }
  };

  // Only allow attaching amenities to active/upcoming bookings
  const validBookings = bookings.filter(b => b.bookingStatus !== "CANCELLED" && b.bookingStatus !== "COMPLETED");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Request an Amenity</h1>

          <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
            <p className="text-gray-600 mb-6 text-sm">
              Need a whiteboard or a projector for your desk? Select your upcoming booking below to request an amenity.
            </p>

            {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{success}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Which Booking?</label>
                <select
                  required
                  value={formData.bookingId}
                  onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select a Booking --</option>
                  {validBookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bookingDate} - Desk #{b.deskNumber} ({b.bookingStatus})
                    </option>
                  ))}
                </select>
                {validBookings.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">You have no active bookings to attach an amenity to.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What do you need?</label>
                <select
                  required
                  value={formData.amenityId}
                  onChange={(e) => setFormData({ ...formData, amenityId: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select an Amenity --</option>
                  {amenities.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.amenityName} - {a.description}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                disabled={loading || validBookings.length === 0}
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestAmenity;