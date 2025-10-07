import React, { useState } from "react";

export default function Support() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Your request has been submitted. Our team will call you soon!");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Support & Call Center</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
