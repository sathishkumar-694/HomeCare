import React, { useState } from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../routes/api.js";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API.USER.LOGIN(), form);

      // Clear any existing session
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Save new token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // No alert; redirect instead
      if (res.data.user.role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/user-dashboard");
      }

      // Trigger navbar update
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
