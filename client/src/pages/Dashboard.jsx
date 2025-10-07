import React from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || user?.shopName}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>This is your individual dashboard.</p>
    </div>
  );
}
