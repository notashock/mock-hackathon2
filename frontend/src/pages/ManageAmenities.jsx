import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ManageAmenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amenityName: "",
    description: "",
  });

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const res = await API.get("/amenities");
      setAmenities(res.data);
    } catch (error) {
      console.error("Failed to fetch amenities", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/amenities", formData);
      setFormData({ amenityName: "", description: "" });
      fetchAmenities(); // Refresh the list
    } catch (error) {
      console.error("Failed to create amenity", error);
      alert("Error creating amenity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Amenities</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Amenity Form */}
            <div className="bg-white p-6 rounded-xl shadow lg:col-span-1 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Amenity</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., HD Projector"
                    value={formData.amenityName}
                    onChange={(e) => setFormData({ ...formData, amenityName: e.target.value })}
                    className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    placeholder="Short description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
                >
                  {loading ? "Adding..." : "Add Amenity"}
                </button>
              </form>
            </div>

            {/* Amenities List */}
            <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Inventory</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amenities.map((amenity) => (
                      <tr key={amenity.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{amenity.amenityName}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{amenity.description}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                            {amenity.availabilityStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {amenities.length === 0 && (
                      <tr>
                        <td colSpan="3" className="py-6 text-center text-gray-500">
                          No amenities added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ManageAmenities;