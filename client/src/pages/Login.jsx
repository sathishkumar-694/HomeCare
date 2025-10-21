import React, { useState, useContext, useEffect } from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../routes/api.js";
import { AuthContext } from "../context/authContext.jsx";
import axios from "axios";

const handleGoogleResponse = async (response) => {
  // This function is intentionally left empty here.
  // We will assign its real logic inside the component's useEffect.
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Attach the real callback logic to the window function
    // This function will be called by Google when the user logs in
    window.handleGoogleResponse = async (response) => {
      setLoading(true);
      try {
        const res = await axios.post(API.USER.GOOGLE_LOGIN(), {
          token: response.credential, 
        });

        // Login with the user data *from your server's* response
        login(res.data.user, res.data.token);
        navigate("/profile");

      } catch (err) {
        console.error("Google login error:", err);
        alert("Google login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // 2. Load the Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // 3. Initialize and render the button *after* the script loads
    script.onload = () => {
      if (window.google) {
        // --- ⚙️ .ENV FIX (Assuming Vite) ---
        // This now reads VITE_GOOGLE_CLIENT_ID from your .env file
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: window.handleGoogleResponse // Use the window function
        });

        // --- 🎨 RENDER FIX ---
        // Render the button in our target div
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "sign_in_with",
            shape: "rectangular",
            logo_alignment: "left"
          }
        );
      }
    };

    // Cleanup function to remove the script
    return () => {
      document.body.removeChild(script);
      delete window.handleGoogleResponse;
    };
  }, [login, navigate]); // Add dependencies

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API.USER.LOGIN(), form);
      login(res.data.user, res.data.token);

      if (res.data.user.role === "vendor") {
        navigate("/dashboard");
      } else if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
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
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* --- 🎨 RENDER FIX --- */}
        {/* We removed the g_id_onload and g_id_signin divs */}
        {/* This empty div is our new target for the button */}
        <div className="w-full flex justify-center">
          <div id="google-signin-button"></div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Create Account
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Are you a vendor?{" "}
            <Link to="/vendor-register" className="text-blue-600 hover:text-blue-700 font-medium">
              Register as Vendor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}