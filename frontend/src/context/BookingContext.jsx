import { createContext, useState, useEffect } from "react";
import API from "../api/axiosConfig";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async (userId) => {
    try {
      const res = await API.get(`/bookings/member/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createBooking = async (data) => {
    try {
      await API.post("/bookings", data);
      fetchBookings(data.userId);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async (id, userId) => {
    try {
      await API.delete(`/bookings/${id}`);
      fetchBookings(userId);
    } catch (err) {
      console.error(err);
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