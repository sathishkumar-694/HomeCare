// src/pages/VendorRegister.jsx
import React, { useState } from "react";
import {Link} from "react-router-dom"
export default function VendorRegister() {
  const [form, setForm] = useState({
    name: "",
    shopName: "",
    service: "",
    nationalProof: "",
    location: "",
    photo: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Vendor details:", form);
    alert(`Thank you ${form.name}, your vendor application is submitted!`);
    setForm({
      name: "",
      shopName: "",
      service: "",
      nationalProof: "",
      location: "",
      photo: null,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🛠 Vendor Registration
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Provide your details to list your shop/service with us.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <input
            type="text"
            name="shopName"
            placeholder="Shop/Service Name"
            value={form.shopName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <input
            type="text"
            name="service"
            placeholder="Type of Service (e.g., Plumbing, Salon, Cleaning)"
            value={form.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <input
            type="text"
            name="nationalProof"
            placeholder="National Proof ID (Aadhar, PAN, etc.)"
            value={form.nationalProof}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Shop Location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            required
          />

          <div>
            <label className="block text-gray-700 mb-2">Shop Photograph</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-xl shadow-md transition duration-200"
          >
            Submit Application 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
