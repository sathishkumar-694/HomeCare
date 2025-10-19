// This should point to your running backend server
const BASE_URL = "http://localhost:5000/api";

export const API = {
  // 👥 User endpoints
  USER: {
    LOGIN: () => `${BASE_URL}/users/login`,
    REGISTER: () => `${BASE_URL}/users/register`,
    PROFILE: (id) => `${BASE_URL}/users/${id}`, // For PUT (update) and GET (get profile)
    GET_ALL: () => `${BASE_URL}/users`,
    DELETE: (id) => `${BASE_URL}/users/${id}`,
  },

  // 📅 Booking endpoints
  BOOKING: {
    CREATE: () => `${BASE_URL}/bookings/create`,
    USER_BOOKINGS: (userId) => `${BASE_URL}/bookings/user/${userId}`,
    VENDOR_BOOKINGS: (vendorId) => `${BASE_URL}/bookings/vendor/${vendorId}`,
  },

  // 🧑‍🔧 Vendor endpoints
  VENDOR: {
    REGISTER: () => `${BASE_URL}/vendor/register`,
    GET_ALL: () => `${BASE_URL}/vendor`,
    APPROVE: (id) => `${BASE_URL}/vendors/${id}/approve`,
    REJECT: (id) => `${BASE_URL}/vendors/${id}/reject`,
  },

  // 👑 Admin endpoints
  ADMIN: {
    LOGIN: () => `${BASE_URL}/admin/login`,
  },

  // ✉️ Contact & Query endpoints
  CONTACT: {
    SEND: () => `${BASE_URL}/contact`,
    GET_ALL: () => `${BASE_URL}/contact`,
  },
  QUERY: {
    GET_ALL: () => `${BASE_URL}/queries`,
    DELETE: (id) => `${BASE_URL}/queries/${id}`,
  },
};