import React, { useState, useContext, useEffect } from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../routes/api.js";
import { AuthContext } from "../context/authContext.jsx";
import axios from "axios";
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // New state to track 'user' or 'vendor' login
  const [loginMode, setLoginMode] = useState("user"); // 'user' or 'vendor'
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      let res;
      if (loginMode === "user") {
        res = await axios.post(API.USER.GOOGLE_LOGIN(), {
          email: payload.email,
          name: payload.name,
          profilePicture: payload.picture
        });
        login(res.data.user, res.data.token);
        navigate("/profile");
      } else {
        res = await axios.post(API.VENDOR.GOOGLE_LOGIN(), {
          email: payload.email,
          name: payload.name,
          profilePicture: payload.picture
        });
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed. Please try again or register first.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    // Debug: Check if client ID is loaded
    console.log("Google Client ID:", clientId);
    
    if (!clientId) {
      console.error("VITE_GOOGLE_CLIENT_ID is not defined in .env file");
      return;
    }

    // Make callback globally accessible
    window.handleGoogleResponse = handleGoogleResponse;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: window.handleGoogleResponse
        });
        
        // Render the button programmatically
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          {
            type: "standard",
            size: "large",
            theme: "outline",
            text: "sign_in_with",
            shape: "rectangular",
            logo_alignment: "left"
          }
        );
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Clean up global callback
      delete window.handleGoogleResponse;
    };
  }, [loginMode]); // Re-initialize when loginMode changes

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
        res = await axios.post(API.VENDOR.LOGIN(), form);
        login(res.data.user, res.data.token);
        
        // Vendor login always goes to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Sign-In Button Container */}
        <div id="googleSignInButton" className="w-full flex justify-center"></div>

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