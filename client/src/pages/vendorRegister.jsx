import React, { useState, useContext, useRef, useEffect } from "react"; // NEW: Added useRef and useEffect
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";

export default function VendorRegister() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    service: "",
    contact: "",
    location: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  // NEW: State for the notification
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });
  
  // NEW: Ref to manage the notification timeout
  const notificationTimeout = useRef(null);

  // NEW: Helper function to show the notification
  function showNotification(message, type = "success") {
    // Clear any existing timeout
    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }
    
    // Show new notification
    setNotification({ show: true, message, type });

    // Set a timeout to hide it after 3 seconds
    notificationTimeout.current = setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
      notificationTimeout.current = null;
    }, 3000);
  }
  
  // NEW: Clean up the timeout if the component unmounts
  useEffect(() => {
    return () => {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
    };
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("shopName", form.shopName);
    formData.append("service", form.service);
    formData.append("contact", form.contact);
    formData.append("location", form.location);
    
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      const res = await axios.post(API.VENDOR.REGISTER(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // After successful registration, automatically log the vendor in
      const loginRes = await axios.post(API.USER.LOGIN(), {
        email: form.email,
        password: form.password
      });
      
      login(loginRes.data.user, loginRes.data.token);

      // NEW: Show success notification
      showNotification(
        `✅ Welcome, ${res.data.vendor.name}! Redirecting to dashboard...`,
        "success"
      );
      
      // NEW: Delay navigation to allow user to see the message
      // The button will remain disabled since loading is still true.
      setTimeout(() => {
        navigate("/dashboard");
        setLoading(false); // Set loading to false *after* navigation
      }, 3000);
      
    } catch (err) {
      console.error(err);
      
      // NEW: Show error notification
      showNotification(
        err.response?.data?.message || "❌ Error submitting application",
        "error"
      );
      setLoading(false); // Set loading to false immediately on error
    }
    // NEW: Removed the 'finally' block as logic is now handled
    // in the try/catch blocks to allow for delayed navigation on success.
  }

  return (
    // NEW: Added 'relative' to the container for positioning the toast
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6 relative">
      
      {/* --- NEW: Notification Toast --- */}
      {notification.show && (
        <div 
          className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-white font-medium z-50 transition-all duration-300
            ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
            ${notification.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
          `}
        >
          {notification.message}
        </div>
      )}
      {/* --- End Notification --- */}
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🛠 Vendor Registration
          </h1>
          <p className="text-gray-600">
            Join our platform as a service provider
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Full Name"
                value={form.name} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="your@email.com"
                value={form.email} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create a secure password"
              value={form.password} 
              onChange={handleChange} 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop/Service Name *
              </label>
              <input 
                type="text" 
                name="shopName" 
                placeholder="Your Business Name"
                value={form.shopName} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type *
              </label>
              <input 
                type="text" 
                name="service" 
                placeholder="Plumbing, Salon, Cleaning, etc."
                value={form.service} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input 
                type="text" 
                name="contact" 
                placeholder="Your phone number"
                value={form.contact} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input 
                type="text" 
                name="location" 
                placeholder="City, State"
                value={form.location} 
                onChange={handleChange} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shop Photograph
            </label>
            <input 
              type="file" 
              name="photo" 
              accept="image/*" 
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
            disabled={loading}
          >
            {loading ? "Submitting Application..." : "Submit Application 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}