// This should point to your running backend server
const BASE_URL = "http://localhost:5000/api";

export const API = {
  // 👥 User endpoints
  USER: {
    LOGIN: () => `${BASE_URL}/users/login`,
    GOOGLE_LOGIN: () => `${BASE_URL}/users/google-login`,
    REGISTER: () => `${BASE_URL}/users/register`,
    PROFILE: (id) => `${BASE_URL}/users/${id}`,
    GET_ALL: () => `${BASE_URL}/users`,
    DELETE: (id) => `${BASE_URL}/users/${id}`,
    NOTIFICATIONS: (userId) => `${BASE_URL}/users/${userId}/notifications`, // <-- NEW
    MARK_NOTIFICATIONS_READ: (userId) => `${BASE_URL}/users/${userId}/notifications/mark-read`, // <-- NEW
  },

  // 📅 Booking endpoints
  BOOKING: {
    CREATE: () => `${BASE_URL}/bookings/create`,
    USER_BOOKINGS: (userId) => `${BASE_URL}/bookings/user/${userId}`,
    VENDOR_BOOKINGS: (vendorId) => `${BASE_URL}/bookings/vendor/${vendorId}`,
    GET_BY_ID: (id) => `${BASE_URL}/bookings/${id}`,
    
    // --- NEW, SPECIFIC ENDPOINTS ---
    // (Replaces the generic 'UPDATE_STATUS')
    
    // Called by Vendor to approve a 'pending' booking
    // Backend MUST set status='confirmed' & create a notification
    APPROVE: (id) => `${BASE_URL}/bookings/${id}/approve`, // <-- NEW

    // Called by Vendor to reject a 'pending' booking
    // Backend MUST set status='cancelled' & create a notification
    REJECT: (id) => `${BASE_URL}/bookings/${id}/reject`, // <-- NEW
    
    // Called by User to pay for a 'confirmed' booking
    // Backend MUST set paymentStatus='completed'
    PAY: (id) => `${BASE_URL}/bookings/${id}/pay`, // <-- NEW
    
    // Called by Vendor to complete a 'confirmed' & 'paid' booking
    // Backend MUST set status='completed'
    COMPLETE: (id) => `${BASE_URL}/bookings/${id}/complete`, // <-- NEW
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
    BOOKINGS: () => `${BASE_URL}/admin/bookings`,
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
