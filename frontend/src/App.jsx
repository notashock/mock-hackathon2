import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

import BookDesk from "./pages/BookDesk";
import BookingHistory from "./pages/BookingHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />

     
        <Route path="/bookdesk" element={<BookDesk />} />
        <Route path="/booking-history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;