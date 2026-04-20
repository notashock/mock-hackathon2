import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ManagerDashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [desks, setDesks] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Updated to match WorkspaceRequest DTO
  const [workspaceData, setWorkspaceData] = useState({
    workspaceName: "",
    location: "",
    totalDesks: "",
  });

  // Updated to match DeskRequest DTO
  const [deskData, setDeskData] = useState({
    deskNumber: "",
    workspaceId: "",
    deskType: "HOT_DESK", // Default value
  });

  useEffect(() => {
    fetchWorkspaces();
    fetchReservations();
  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      fetchDesks(selectedWorkspace);
    }
  }, [selectedWorkspace]);

  const fetchWorkspaces = async () => {
    try {
      const res = await API.get("/workspaces");
      setWorkspaces(res.data);
      if (res.data.length > 0) {
        setSelectedWorkspace(res.data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDesks = async (id) => {
    try {
      const res = await API.get(`/desks?workspaceId=${id}`);
      setDesks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await API.get("/amenity-reservations");
      setReservations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createWorkspace = async (e) => {
    e.preventDefault();
    try {
      await API.post("/workspaces", {
        ...workspaceData,
        totalDesks: parseInt(workspaceData.totalDesks), // Ensure it's a number
      });
      fetchWorkspaces();
      setWorkspaceData({ workspaceName: "", location: "", totalDesks: "" });
    } catch (error) {
      console.error("Error creating workspace", error);
    }
  };

  const createDesk = async (e) => {
    e.preventDefault();
    try {
      await API.post("/desks", {
        ...deskData,
        deskNumber: parseInt(deskData.deskNumber), // Ensure it's a number
      });
      fetchDesks(deskData.workspaceId);
      setDeskData({ ...deskData, deskNumber: "" });
    } catch (error) {
      console.error("Error creating desk", error);
    }
  };

  const approveAmenity = async (id) => {
    try {
      await API.put(`/amenity-reservations/${id}/approve`);
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectAmenity = async (id) => {
    try {
      await API.put(`/amenity-reservations/${id}/reject`);
      fetchReservations();
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
          <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

          {/* Create Workspace */}
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Create Workspace</h2>
            <form onSubmit={createWorkspace} className="flex gap-4">
              <input
                type="text"
                required
                placeholder="Workspace Name"
                value={workspaceData.workspaceName}
                onChange={(e) => setWorkspaceData({ ...workspaceData, workspaceName: e.target.value })}
                className="flex-1 border p-2 rounded"
              />
              <input
                type="text"
                required
                placeholder="Location"
                value={workspaceData.location}
                onChange={(e) => setWorkspaceData({ ...workspaceData, location: e.target.value })}
                className="flex-1 border p-2 rounded"
              />
              <input
                type="number"
                required
                min="1"
                placeholder="Total Desks"
                value={workspaceData.totalDesks}
                onChange={(e) => setWorkspaceData({ ...workspaceData, totalDesks: e.target.value })}
                className="w-32 border p-2 rounded"
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors">
                Create
              </button>
            </form>
          </div>

          {/* Add Desk */}
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Add Desk</h2>
            <form onSubmit={createDesk} className="flex gap-4">
              <select
                required
                value={deskData.workspaceId}
                onChange={(e) => setDeskData({ ...deskData, workspaceId: e.target.value })}
                className="flex-1 border p-2 rounded"
              >
                <option value="">Select Workspace</option>
                {workspaces.map((ws) => (
                  <option key={ws.id} value={ws.id}>
                    {ws.workspaceName}
                  </option>
                ))}
              </select>

              <select
                required
                value={deskData.deskType}
                onChange={(e) => setDeskData({ ...deskData, deskType: e.target.value })}
                className="flex-1 border p-2 rounded"
              >
                <option value="HOT_DESK">Hot Desk</option>
                <option value="DEDICATED_DESK">Dedicated Desk</option>
              </select>

              <input
                type="number"
                required
                placeholder="Desk Number"
                value={deskData.deskNumber}
                onChange={(e) => setDeskData({ ...deskData, deskNumber: e.target.value })}
                className="w-32 border p-2 rounded"
              />
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors">
                Add Desk
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* View Desks */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Workspace Inventory</h2>
              <select
                value={selectedWorkspace}
                onChange={(e) => setSelectedWorkspace(e.target.value)}
                className="w-full border p-2 rounded mb-4"
              >
                {workspaces.map((ws) => (
                  <option key={ws.id} value={ws.id}>
                    {ws.workspaceName} ({ws.location})
                  </option>
                ))}
              </select>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {desks.map((desk) => (
                  <div key={desk.id} className="flex justify-between border p-3 rounded bg-gray-50">
                    <span className="font-medium">Desk #{desk.deskNumber}</span>
                    <span className="text-gray-500 text-sm">{desk.deskType.replace('_', ' ')}</span>
                    <span className={`text-sm font-semibold ${desk.availabilityStatus === 'AVAILABLE' ? 'text-green-500' : 'text-gray-500'}`}>
                      {desk.availabilityStatus}
                    </span>
                  </div>
                ))}
                {desks.length === 0 && <p className="text-gray-500 text-center py-4">No desks in this workspace yet.</p>}
              </div>
            </div>

            {/* Amenity Reservations */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Amenity Requests</h2>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {reservations.map((r) => (
                  <div key={r.id} className="flex justify-between items-center border p-3 rounded bg-gray-50">
                    <div>
                      <p className="font-medium">{r.amenityName}</p>
                      <p className="text-sm text-gray-500">Status: {r.reservationStatus}</p>
                    </div>

                    {r.reservationStatus === "REQUESTED" && (
                      <div className="space-x-2">
                        <button
                          onClick={() => approveAmenity(r.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectAmenity(r.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {reservations.length === 0 && <p className="text-gray-500 text-center py-4">No requests found.</p>}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;