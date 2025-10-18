import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "client") {
      // When client is selected → go to services list page
      navigate("/services");
    } else {
      // When provider is selected → go to vendor form
      navigate("/vendor-register");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Choose Your Role</h2>
          <p className="mt-2 text-gray-600">
            Select the role that best describes you to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <fieldset className="space-y-4">
            <legend className="sr-only">Role selection</legend>

            {/* Client Option */}
            <label
              htmlFor="client"
              className={`flex p-4 border rounded-lg cursor-pointer transition-all ${
                role === "client"
                  ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                id="client"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-3 mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-grow">
                <span className="text-lg font-medium text-gray-900">
                  Client
                </span>
                <p className="text-sm text-gray-500">
                  Hire professionals for your projects.
                </p>
              </div>
            </label>

            {/* Service Provider Option */}
            <label
              htmlFor="provider"
              className={`flex p-4 border rounded-lg cursor-pointer transition-all ${
                role === "provider"
                  ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                id="provider"
                name="role"
                value="provider"
                checked={role === "provider"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-3 mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-grow">
                <span className="text-lg font-medium text-gray-900">
                  Service Provider
                </span>
                <p className="text-sm text-gray-500">
                  Offer your services and connect with clients.
                </p>
              </div>
            </label>
          </fieldset>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}