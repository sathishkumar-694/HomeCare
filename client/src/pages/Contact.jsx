// src/pages/Contact.jsx
import React, { useState } from "react";
import axios from "axios";
import { API } from "../routes/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-cust p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          📬 Get in Touch
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We’d love to hear from you! Send us an email using the form below.
        </p>

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
    </div>
  );
}
