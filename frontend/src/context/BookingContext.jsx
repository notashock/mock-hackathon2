import { createContext, useState, useCallback } from "react";
import API from "../api/axiosConfig";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await API.get("/bookings/my-bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  }, []);

  const createBooking = async (data) => {
    try {
      await API.post("/bookings", data);
      fetchBookings(); // Refresh list after successful creation
    } catch (err) {
      console.error("Failed to create booking", err);
      throw err; // Throw error to handle it in the UI (e.g., overlap alerts)
    }
  };

  const cancelBooking = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      fetchBookings(); // Refresh list after cancellation
    } catch (err) {
      console.error("Failed to cancel booking", err);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        fetchBookings,
        createBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};