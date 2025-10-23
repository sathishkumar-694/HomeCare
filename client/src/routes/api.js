const BASE_URL = "http://localhost:5000/api";

export const API = {
  USER: {
    LOGIN: () => `${BASE_URL}/users/login`,
    GOOGLE_LOGIN: () => `${BASE_URL}/users/google-login`,
    REGISTER: () => `${BASE_URL}/users/register`,
    PROFILE: (id) => `${BASE_URL}/users/${id}`,
    GET_ALL: () => `${BASE_URL}/users`,
    DELETE: (id) => `${BASE_URL}/users/${id}`,
    NOTIFICATIONS: (userId) => `${BASE_URL}/users/${userId}/notifications`,
    MARK_NOTIFICATIONS_READ: (userId) => `${BASE_URL}/users/${userId}/notifications/mark-read`,
  },

  BOOKING: {
    CREATE: () => `${BASE_URL}/bookings/create`,
    USER_BOOKINGS: (userId) => `${BASE_URL}/bookings/user/${userId}`,
    VENDOR_BOOKINGS: (vendorId) => `${BASE_URL}/bookings/vendor/${vendorId}`,
    GET_BY_ID: (id) => `${BASE_URL}/bookings/${id}`,
    APPROVE: (id) => `${BASE_URL}/bookings/${id}/approve`,
    REJECT: (id) => `${BASE_URL}/bookings/${id}/reject`,
    COMPLETE: (id) => `${BASE_URL}/bookings/${id}/complete`,
    CONFIRM_PAYMENT: (id) => `${BASE_URL}/bookings/${id}/confirm-payment`,
  },

  VENDOR: {
    REGISTER: () => `${BASE_URL}/vendor/register`,
    LOGIN: () => `${BASE_URL}/vendor/login`,
    GOOGLE_LOGIN: () => `${BASE_URL}/vendor/google-login`,
    GET_ALL: () => `${BASE_URL}/vendor`,
    APPROVE: (id) => `${BASE_URL}/admin/vendors/${id}/approve`,
    REJECT: (id) => `${BASE_URL}/admin/vendors/${id}/reject`,
    REMOVE: (id) => `${BASE_URL}/admin/vendors/${id}/remove`,
  },
  
  ADMIN: {
    LOGIN: () => `${BASE_URL}/admin/login`,
    STATS: () => `${BASE_URL}/admin/stats`,
    BOOKINGS: () => `${BASE_URL}/admin/bookings`,
  },

  CONTACT: {
    SEND: () => `${BASE_URL}/contact`,
    GET_ALL: () => `${BASE_URL}/contact`,
  },
  QUERY: {
    GET_ALL: () => `${BASE_URL}/queries`,
    DELETE: (id) => `${BASE_URL}/queries/${id}`,
  },

  FEEDBACK: {
    CREATE: () => `${BASE_URL}/feedback`,
    GET_BY_BOOKING: (bookingId) => `${BASE_URL}/feedback/booking/${bookingId}`,
    GET_BY_VENDOR: (vendorId) => `${BASE_URL}/feedback/vendor/${vendorId}`,
  },

  EMAIL: {
    SEND_NOTIFICATION: () => `${BASE_URL}/email/send-notification`,
  },
};