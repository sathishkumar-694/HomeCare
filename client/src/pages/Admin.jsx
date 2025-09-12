import React from "react";
import { logout } from "../auth/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const providers = [
    { id: 1, name: "Raj Kumar", service: "Plumber", status: "Pending" },
    { id: 2, name: "Priya Sharma", service: "Electrician", status: "Approved" },
  ];

  const handleApprove = (id) => {
    alert(`Provider ${id} approved ✅`);
  };

  const handleReject = (id) => {
    alert(`Provider ${id} rejected ❌`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-4">Service Providers</h3>
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.service}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleApprove(p.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(p.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
