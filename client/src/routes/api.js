const BASE_URL = "http://localhost:5000/api"; // points to your running backend

export const API = {
  // 🧑‍🔧 Vendor endpoints
  VENDOR: {
    REGISTER: () => `${BASE_URL}/vendor/register`,
    GET_ALL: () => `${BASE_URL}/vendor`,
    APPROVE: (id) => `${BASE_URL}/admin/vendors/${id}/approve`,
    REJECT: (id) => `${BASE_URL}/admin/vendors/${id}/reject`,
  },

  // 👥 User endpoints
  USER: {
    REGISTER: () => `${BASE_URL}/users/register`,
    LOGIN: () => `${BASE_URL}/users/login`,
    PROFILE: (id) => `${BASE_URL}/users/${id}`,
    GET_ALL: () => `${BASE_URL}/users`, // ✅ For Admin Users Page
    DELETE: (id) => `${BASE_URL}/users/${id}`, // ✅ For removing users
  },

  // 💬 Queries endpoints
  QUERY: {
    GET_ALL: () => `${BASE_URL}/queries`, // ✅ Fetch all user queries
    DELETE: (id) => `${BASE_URL}/queries/${id}`, // ✅ Delete query by ID
  },

  // 📅 Booking endpoints
  BOOKING: {
    CREATE: () => `${BASE_URL}/bookings/create`,
    USER_BOOKINGS: (userId) => `${BASE_URL}/bookings/user/${userId}`,
    VENDOR_BOOKINGS: (vendorId) => `${BASE_URL}/bookings/vendor/${vendorId}`,
  },

  // 👑 Admin login (hardcoded in frontend, but kept for future use)
  ADMIN: {
    LOGIN: () => `${BASE_URL}/admin/login`,
  },
  CONTACT: {
  SEND: () => `${BASE_URL}/contact`,       // for user contact form
  GET_ALL: () => `${BASE_URL}/contact`,    // for admin queries
},
};
