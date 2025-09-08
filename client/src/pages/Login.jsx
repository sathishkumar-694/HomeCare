import React, { useState } from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("login", form);
    alert("Submitted (console)");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 
          rounded hover:bg-blue-700transition duration-300">Login</Button></form>

        <p className="mt-6 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  );
}
