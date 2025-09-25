import React, { useState } from "react";

export default function VendorRegister() {
  const [form, setForm] = useState({
    name: "",
    shopName: "",
    service: "",
    nationalProof: "",
    location: "",
    photo: "",
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0].name : value, // for now, just store file name
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("shopName", form.shopName);
  formData.append("service", form.service);
  formData.append("nationalProof", form.nationalProof);
  formData.append("location", form.location);
  formData.append("photo", form.photo);

  try {
    const res = await fetch("http://localhost:5000/api/vendors", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to submit vendor application");
    }

    const data = await res.json();
    alert(`Thank you ${data.name}, your application was submitted!`);
    setForm({
      name: "",
      shopName: "",
      service: "",
      nationalProof: "",
      location: "",
      photo: null,
    });
  } catch (err) {
    console.error(err);
    alert("❌ Error submitting application");
  }
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
          <input type="text" name="name" placeholder="Your Full Name"
            value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" required />
          
          <input type="text" name="shopName" placeholder="Shop/Service Name"
            value={form.shopName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" required />
          
          <input type="text" name="service" placeholder="Type of Service (Plumbing, Salon, Cleaning)"
            value={form.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" required />

          <input type="text" name="nationalProof" placeholder="National Proof ID"
            value={form.nationalProof} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" required />

          <input type="text" name="location" placeholder="Shop Location"
            value={form.location} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" required />

          <div>
            <label className="block text-gray-700 mb-2">Shop Photograph</label>
            <input type="file" name="photo" accept="image/*" onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl" />
          </div>

          <button type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-xl shadow-md transition">
            Submit Application 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
