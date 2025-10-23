import React, { useState, useContext } from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../routes/api.js";
import { AuthContext } from "../context/authContext.jsx";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // New state to track 'user' or 'vendor' login
  const [loginMode, setLoginMode] = useState("user"); // 'user' or 'vendor'
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  // This function now handles both login types based on 'loginMode'
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (loginMode === "user") {
        // --- User Login Logic ---
        res = await axios.post(API.USER.LOGIN(), form);
        login(res.data.user, res.data.token);

        // Redirect based on user role
        if (res.data.user.role === "vendor") {
          navigate("/dashboard");
        } else if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        // --- Vendor Login Logic ---
        res = await axios.post(API.VENDOR.LOGIN(), form);
        login(res.data.user, res.data.token);
        
        // Vendor login always goes to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  // Helper to toggle mode and clear the form
  function toggleMode(mode) {
    setLoginMode(mode);
    setForm({ email: "", password: "" }); // Clear form fields on toggle
  }

  // Determine styles and text based on the login mode
  const isUserMode = loginMode === "user";
  const gradientBG = isUserMode
    ? "from-blue-50 to-indigo-100"
    : "from-purple-50 to-blue-100";
  const buttonBG = isUserMode
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-purple-600 hover:bg-purple-700";

  return (
    <div className={`min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-br ${gradientBG}`}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* --- Conditional Header --- */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isUserMode ? "Welcome Back" : "Vendor Login"}
          </h2>
          <p className="text-gray-600">
            {isUserMode ? "Sign in to your account" : "Sign in to your vendor account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          
          {/* --- Conditional Button --- */}
          <Button
            type="submit"
            className={`w-full text-white py-3 rounded-lg ${buttonBG} transition-colors duration-200 font-medium`}
            disabled={loading}
          >
            {loading ? "Signing in..." : (isUserMode ? "Sign In" : "Sign In as Vendor")}
          </Button>
        </form>

        {/* --- Conditional Links at the bottom --- */}
        <div className="mt-8 text-center">
          {isUserMode ? (
            <>
              {/* --- User Mode Links --- */}
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create Account
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Are you a vendor?{" "}
                <button
                  type="button"
                  onClick={() => toggleMode("vendor")}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Login as Vendor
                </button>
              </p>
            </>
          ) : (
            <>
              {/* --- Vendor Mode Links --- */}
              <p className="text-sm text-gray-600">
                Don't have a vendor account?{" "}
                <Link to="/vendor-register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Register as Vendor
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Already have a user account?{" "}
                <button
                  type="button"
                  onClick={() => toggleMode("user")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  User Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}