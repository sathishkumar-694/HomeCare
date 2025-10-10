import React, { useEffect, useState } from "react";

export default function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/queries")
      .then((res) => res.json())
      .then((data) => {
        setQueries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching queries:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading queries...</div>;
  }

  if (queries.length === 0) {
    return <div className="p-6 text-lg font-semibold">No queries found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Queries</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Message</th>
              <th className="border p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q._id} className="hover:bg-gray-100">
                <td className="border p-3">{q.name}</td>
                <td className="border p-3">{q.email}</td>
                <td className="border p-3">{q.message}</td>
                <td className="border p-3">
                  {new Date(q.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
