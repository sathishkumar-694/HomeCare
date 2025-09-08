import React from "react";
import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Choose Your Role</h1>
      <div className="flex gap-6">
        <Link to="/vendor">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow">
            I am a Vendor
          </button>
        </Link>
        <Link to="/client">
          <button className="px-6 py-3 bg-green-500 text-white rounded-xl shadow">
            I am a Client
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Services;
