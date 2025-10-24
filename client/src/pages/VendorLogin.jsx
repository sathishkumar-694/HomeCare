import React, { useState, useContext, useEffect } from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../routes/api.js";
import { AuthContext } from "../context/authContext.jsx";
import axios from "axios";
import toast from 'react-hot-toast';

export default function VendorLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Google OAuth for vendors
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
          callback: handleGoogleResponse
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      // Try to login with Google credentials as vendor
      const res = await axios.post(API.VENDOR.GOOGLE_LOGIN(), {
        email: payload.email,
        name: payload.name,
        profilePicture: payload.picture
      });

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed. Please try again or register as a vendor first.");
    } finally {
      setLoading(false);
    }
  };

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API.VENDOR.LOGIN(), form);

      // Use the auth context to handle login
      login(res.data.user, res.data.token);

      // Redirect to vendor dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Vendor Login</h2>
          <p className="text-gray-600">Sign in to your vendor account</p>
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In as Vendor"}
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

        {/* Google Login Button */}
        <div className="w-full">
          <div id="g_id_onload"
               data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"}
               data-callback="handleGoogleResponse"
               data-auto_prompt="false">
          </div>
          <div className="g_id_signin w-full"
               data-type="standard"
               data-size="large"
               data-theme="outline"
               data-text="sign_in_with"
               data-shape="rectangular"
               data-logo_alignment="left">
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have a vendor account?{" "}
            <Link to="/vendor-register" className="text-purple-600 hover:text-purple-700 font-medium">
              Register as Vendor
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Are you a regular user?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
