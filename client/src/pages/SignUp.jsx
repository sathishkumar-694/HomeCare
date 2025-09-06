import React, { useState } from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import { Link, useLocation } from "react-router-dom";

export default function Signup() {
  const location = useLocation();
  // If user came from role-selection we can read state/params; for now keep simple
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("signup", form);
    alert("Sign up submitted (console)");
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <h2 className="text-3xl font-bold mb-6">Create account</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <InputField label="Full name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
        <InputField label="Email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter a strong password" />

        <div className="mt-4">
          <Button type="submit">Sign up</Button>
        </div>
      </form>

      <p className="mt-6 text-sm">
        Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
      </p>
    </div>
  );
}
