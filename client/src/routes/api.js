// This should point to your running backend server
const BASE_URL = "http://localhost:5000/api";

export const API = {
  // 👥 User endpoints
  USER: {
    LOGIN: () => `${BASE_URL}/users/login`,
    GOOGLE_LOGIN: () => `${BASE_URL}/users/google-login`,
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
    GET_BY_ID: (id) => `${BASE_URL}/bookings/${id}`,
    UPDATE_STATUS: (id) => `${BASE_URL}/bookings/${id}/status`,
  },

  // 🧑‍🔧 Vendor endpoints
  VENDOR: {
    REGISTER: () => `${BASE_URL}/vendor/register`,
    LOGIN: () => `${BASE_URL}/vendor/login`,
    GOOGLE_LOGIN: () => `${BASE_URL}/vendor/google-login`,
    GET_ALL: () => `${BASE_URL}/vendor`,
    APPROVE: (id) => `${BASE_URL}/admin/vendors/${id}/approve`,
    REJECT: (id) => `${BASE_URL}/admin/vendors/${id}/reject`,
    REMOVE: (id) => `${BASE_URL}/admin/vendors/${id}/remove`,
  },

  // 👑 Admin endpoints
  ADMIN: {
    LOGIN: () => `${BASE_URL}/admin/login`,
    STATS: () => `${BASE_URL}/admin/stats`,
    BOOKINGS: () => `${BASE_URL}/admin/bookings`, // <-- ADD THIS LINE
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

  // 📝 Feedback endpoints
  FEEDBACK: {
    CREATE: () => `${BASE_URL}/feedback`,
    GET_BY_BOOKING: (bookingId) => `${BASE_URL}/feedback/booking/${bookingId}`,
    GET_BY_VENDOR: (vendorId) => `${BASE_URL}/feedback/vendor/${vendorId}`,
  },

  // 📧 Email endpoints
  EMAIL: {
    SEND_NOTIFICATION: () => `${BASE_URL}/email/send-notification`,
  },
};