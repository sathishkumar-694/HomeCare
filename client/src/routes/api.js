// src/api/api.js (frontend)
const BASE_URL = "http://localhost:5000/api"; // points to your running backend

export const API = {
  // Vendor endpoints
  VENDOR: {
    REGISTER: () => `${BASE_URL}/vendor/register`,
    GET_ALL: () => `${BASE_URL}/vendor`,
  },

  // User endpoints
  USER: {
    REGISTER: () => `${BASE_URL}/users/register`,
    LOGIN: () => `${BASE_URL}/users/login`,
    PROFILE: (id) => `${BASE_URL}/users/${id}`,
  },

  // Booking endpoints
  BOOKING: {
    CREATE: () => `${BASE_URL}/bookings/create`,
    USER_BOOKINGS: (userId) => `${BASE_URL}/bookings/user/${userId}`,
    VENDOR_BOOKINGS: (vendorId) => `${BASE_URL}/bookings/vendor/${vendorId}`,
  },
};
