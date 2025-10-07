import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const role = storedUser?.role || "user";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/${role}s/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchData();
  }, [role, storedUser.id, token]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/${role}s/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(user),
    });
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-4">
        <input
          name="name"
          value={user.name || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          disabled={!isEditing}
        />
        <input
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          className="border p-2 w-full"
          disabled={!isEditing}
        />
        {role === "user" && (
          <input
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            className="border p-2 w-full"
            disabled={!isEditing}
          />
        )}

        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
