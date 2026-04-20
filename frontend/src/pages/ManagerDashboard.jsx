import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/axiosConfig";

function ManagerDashboard() {
  const [desks, setDesks] = useState([]);
  const [amenities, setAmenities] = useState([]);

  // Fetch from backend
  useEffect(() => {
    fetchDesks();
    fetchAmenities();
  }, []);

  const fetchDesks = async () => {
    try {
      const res = await API.get("/desks");
      setDesks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAmenities = async () => {
    try {
      const res = await API.get("/amenities");
      setAmenities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveAmenity = async (id) => {
    await API.put(`/amenity-reservations/${id}/approve`);
    fetchAmenities();
  };

  const rejectAmenity = async (id) => {
    await API.put(`/amenity-reservations/${id}/reject`);
    fetchAmenities();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>

      {/* Desk Table */}
      <div className="mb-8">
        <h3 className="text-xl mb-2">Desks</h3>
        {desks.map((desk) => (
          <div key={desk.id} className="border p-2 mb-2">
            {desk.name} - {desk.status}
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-xl mb-2">Amenities Approval</h3>
        {amenities.map((a) => (
          <div key={a.id} className="flex justify-between mb-2">
            <span>{a.name}</span>
            <div>
              <button
                onClick={() => approveAmenity(a.id)}
                className="bg-green-500 text-white px-2 py-1 mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => rejectAmenity(a.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerDashboard;