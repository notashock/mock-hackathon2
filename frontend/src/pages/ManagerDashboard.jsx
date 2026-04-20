import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ManagerDashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [desks, setDesks] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [workspaceData, setWorkspaceData] = useState({
    name: "",
    location: "",
  });

  const [deskData, setDeskData] = useState({
    deskNumber: "",
    workspaceId: "",
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
      await API.post("/workspaces", workspaceData);
      fetchWorkspaces();
      setWorkspaceData({ name: "", location: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const createDesk = async (e) => {
    e.preventDefault();
    try {
      await API.post("/desks", deskData);
      fetchDesks(deskData.workspaceId);
      setDeskData({ deskNumber: "", workspaceId: "" });
    } catch (error) {
      console.error(error);
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
          <h1 className="text-3xl font-bold mb-6">
            Manager Dashboard
          </h1>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Create Workspace
            </h2>

            <form onSubmit={createWorkspace}>
              <input
                type="text"
                placeholder="Workspace Name"
                value={workspaceData.name}
                onChange={(e) =>
                  setWorkspaceData({
                    ...workspaceData,
                    name: e.target.value,
                  })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              <input
                type="text"
                placeholder="Location"
                value={workspaceData.location}
                onChange={(e) =>
                  setWorkspaceData({
                    ...workspaceData,
                    location: e.target.value,
                  })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Create
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Add Desk
            </h2>

            <form onSubmit={createDesk}>
              <input
                type="text"
                placeholder="Desk Number"
                value={deskData.deskNumber}
                onChange={(e) =>
                  setDeskData({
                    ...deskData,
                    deskNumber: e.target.value,
                  })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              <select
                value={deskData.workspaceId}
                onChange={(e) =>
                  setDeskData({
                    ...deskData,
                    workspaceId: e.target.value,
                  })
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

              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Add Desk
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Workspaces
            </h2>

            <select
              value={selectedWorkspace}
              onChange={(e) =>
                setSelectedWorkspace(e.target.value)
              }
              className="border p-2 rounded mb-4"
            >
              {workspaces.map((ws) => (
                <option key={ws.id} value={ws.id}>
                  {ws.name}
                </option>
              ))}
            </select>

            {desks.map((desk) => (
              <div
                key={desk.id}
                className="border p-2 rounded mb-2"
              >
                {desk.deskNumber} - {desk.status}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Amenity Requests
            </h2>

            {reservations.map((r) => (
              <div
                key={r.id}
                className="flex justify-between items-center border p-2 rounded mb-2"
              >
                <span>{r.amenityName}</span>

                <div className="space-x-2">
                  <button
                    onClick={() => approveAmenity(r.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectAmenity(r.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {reservations.length === 0 && (
              <p>No requests found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;