import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/api";

export default function Queries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axios.get(API.CONTACT.GET_ALL())
      .then(res => setQueries(res.data))
      .catch(err => console.error("Error fetching queries:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Queries</h2>
      {queries.length === 0 ? (
        <p>No queries available.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q._id}>
                <td className="px-4 py-2 border">{q.name}</td>
                <td className="px-4 py-2 border">{q.email}</td>
                <td className="px-4 py-2 border">{q.message}</td>
                <td className="px-4 py-2 border">{new Date(q.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
