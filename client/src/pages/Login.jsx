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
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <h2 className="text-3xl font-bold mb-6">Welcome back</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
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

        <div className="mt-4">
          <Button type="submit">Login</Button>
        </div>
      </form>

      <p className="mt-6 text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
      </p>
    </div>
  );
}
