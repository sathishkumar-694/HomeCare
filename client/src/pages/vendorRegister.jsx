import React, { useState, useContext } from "react";
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

      alert(`✅ Thank you ${res.data.vendor.name}, your application was submitted!`);
      
      // After successful registration, automatically log the vendor in
      const loginRes = await axios.post(API.USER.LOGIN(), {
        email: form.email,
        password: form.password
      });
      
      login(loginRes.data.user, loginRes.data.token);
      navigate("/dashboard");
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Error submitting application");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
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
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl shadow-md transition-all duration-200 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Submitting Application..." : "Submit Application 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}