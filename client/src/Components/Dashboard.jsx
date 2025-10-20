import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../routes/api";
import { FaUsers, FaStore, FaClock, FaQuestionCircle } from "react-icons/fa";

// A small, reusable component for the stat cards
const StatCard = ({ title, value, icon, bgColor = "bg-blue-500" }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-5 border-l-4 border-blue-500">
    <div className={`text-3xl text-white p-3 rounded-full ${bgColor}`}>
      {icon}
    </div>
    <div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(API.ADMIN.STATS());
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-6">Could not load dashboard stats.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      {/* Stats Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.userCount}
          icon={<FaUsers />}
          bgColor="bg-blue-500"
        />
        <StatCard
          title="Total Vendors"
          value={stats.vendorCount}
          icon={<FaStore />}
          bgColor="bg-green-500"
        />
        <StatCard
          title="Pending Vendors"
          value={stats.pendingVendorCount}
          icon={<FaClock />}
          bgColor="bg-yellow-500"
        />
        <StatCard
          title="New Queries"
          value={stats.queryCount}
          icon={<FaQuestionCircle />}
          bgColor="bg-red-500"
        />
      </div>

      {/* You can add charts or recent activity lists here later */}
    </div>
  );
}