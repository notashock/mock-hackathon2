function AdminDashboard() {
  const stats = [
    { title: "Total Users", value: 120, color: "bg-blue-500" },
    { title: "Total Bookings", value: 85, color: "bg-green-500" },
    { title: "Available Desks", value: 40, color: "bg-yellow-500" },
    { title: "Revenue", value: "₹25,000", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">
          Admin Panel
        </h1>

        <ul className="space-y-4">
          <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer">Users</li>
          <li className="hover:text-blue-500 cursor-pointer">Bookings</li>
          <li className="hover:text-blue-500 cursor-pointer">Reports</li>
          <li className="hover:text-blue-500 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5"
            >
              <div
                className={`w-12 h-12 ${item.color} rounded-full mb-4`}
              ></div>
              <h3 className="text-gray-500">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Recent Bookings
          </h3>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">User</th>
                <th className="py-2">Desk</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">Kalyani</td>
                <td>D-101</td>
                <td>20 Apr</td>
                <td className="text-green-500">Confirmed</td>
              </tr>

              <tr className="border-b">
                <td className="py-2">Sindhu</td>
                <td>D-202</td>
                <td>21 Apr</td>
                <td className="text-yellow-500">Pending</td>
              </tr>

              <tr>
                <td className="py-2">Ravi</td>
                <td>D-303</td>
                <td>22 Apr</td>
                <td className="text-red-500">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;