import React, { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext();

const MOCK_INITIAL_BOOKINGS = [
  {
    id: "b-mock-1",
    hotelId: "h1",
    hotelName: "Aetheria Maldives Overwater Resort",
    hotelImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80",
    roomId: "h1-r1",
    roomName: "Ocean Sunrise Overwater Villa",
    checkIn: "2026-08-10",
    checkOut: "2026-08-17",
    guests: 2,
    totalDays: 7,
    totalCost: 5950,
    status: "Confirmed",
    bookedAt: "2026-06-12",
    guestName: "Alex Mercer",
    guestEmail: "alex.mercer@aetheria.com"
  },
  {
    id: "b-mock-2",
    hotelId: "h3",
    hotelName: "Hanami Ryokan & Spa Kyoto",
    hotelImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    roomId: "h3-r1",
    roomName: "Standard Tatami Room",
    checkIn: "2026-04-12",
    checkOut: "2026-04-15",
    guests: 2,
    totalDays: 3,
    totalCost: 1140,
    status: "Completed",
    bookedAt: "2026-03-05",
    guestName: "Alex Mercer",
    guestEmail: "alex.mercer@aetheria.com"
  }
];

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('aetheria_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error reading bookings from localStorage", e);
      }
    }
    return MOCK_INITIAL_BOOKINGS;
  });

  const [user, setUser] = useState({
    name: "Alex Mercer",
    email: "alex.mercer@aetheria.com",
    tier: "Gold Elite Member",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  });

  useEffect(() => {
    localStorage.setItem('aetheria_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) => {
    const bookingWithId = {
      ...newBooking,
      id: `b-${Date.now()}`,
      bookedAt: new Date().toISOString().split('T')[0],
      status: "Confirmed"
    };
    setBookings(prevBookings => [bookingWithId, ...prevBookings]);
    return bookingWithId;
  };

  const cancelBooking = (id) => {
    setBookings(prevBookings => 
      prevBookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
    );
  };

  const deleteBookingRecord = (id) => {
    setBookings(prevBookings => prevBookings.filter(b => b.id !== id));
  };

  return (
    <BookingContext.Provider value={{
      searchParams,
      setSearchParams,
      bookings,
      addBooking,
      cancelBooking,
      deleteBookingRecord,
      user,
      setUser
    }}>
      {children}
    </BookingContext.Provider>
  );
};
