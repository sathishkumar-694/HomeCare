// src/pages/Contact.jsx
import React, { useState } from "react";
import axios from "axios";
import { API } from "../routes/api";
import { Mail, Phone, Instagram, X } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API.CONTACT.SEND(), form);
      alert(`Thanks ${form.name}, your message has been sent!`);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting query:", err);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          📬 Get in Touch
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We'd love to hear from you! Send us an email using the form below.
        </p>

        {/* Contact Info Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowContactPopup(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            📞 Contact Information
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium py-3 rounded-xl shadow-md transition duration-200`}
          >
            {loading ? "Sending..." : "Send Message ✨"}
          </button>
        </form>
      </div>

      {/* Contact Popup Modal */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowContactPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📞 Contact Information
            </h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="bg-blue-500 p-3 rounded-full">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a 
                    href="mailto:support@homecare.com" 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    support@homecare.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <div className="bg-green-500 p-3 rounded-full">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <a 
                    href="tel:+1234567890" 
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors">
                <div className="bg-pink-500 p-3 rounded-full">
                  <Instagram className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Instagram</h3>
                  <a 
                    href="https://instagram.com/homecare" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    @homecare
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                We're available 24/7 to help you with any questions or concerns!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
