import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";

// Import your images
import plumberImg from "../assets/plumber.jpg";
import cleanerImg from "../assets/plumber.jpg";
import barberImg from "../assets/barber.jpg";

export default function ServicesList() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(API.VENDOR.GET_ALL());
      // Only show approved vendors
      const approvedVendors = res.data.filter(vendor => vendor.status === "approved");
      setVendors(approvedVendors);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    } finally {
      setLoading(false);
    }
  };

  const getServiceImage = (service) => {
    const serviceLower = service.toLowerCase();
    if (serviceLower.includes("plumb")) return plumberImg;
    if (serviceLower.includes("clean")) return cleanerImg;
    if (serviceLower.includes("salon") || serviceLower.includes("hair")) return barberImg;
    return plumberImg; // default
  };

  const filteredVendors = filter === "all" 
    ? vendors 
    : vendors.filter(vendor => vendor.service.toLowerCase().includes(filter.toLowerCase()));

  const handleBookNow = (vendor) => {
    if (!isAuthenticated) {
      alert("Please login to book a service");
      navigate("/login");
      return;
    }

    // Create a service object with required fields for payment page
    const serviceData = {
      _id: vendor._id,
      name: vendor.name,
      service: vendor.service,
      price: 500, // Default price, you can add this to vendor model
      date: new Date().toISOString().split('T')[0], // Today's date
      time: "10:00 AM", // Default time
      location: vendor.location,
      contact: vendor.contact
    };

    navigate("/payment", { state: serviceData });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Available Service Providers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our verified and approved service providers for all your home service needs
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setFilter("plumbing")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "plumbing"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Plumbing
          </button>
          <button
            onClick={() => setFilter("cleaning")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "cleaning"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Cleaning
          </button>
          <button
            onClick={() => setFilter("salon")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === "salon"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Salon
          </button>
        </div>

        {/* Services Grid */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your filter or check back later for new providers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map((vendor) => (
              <div
                key={vendor._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={getServiceImage(vendor.service)}
                    alt={vendor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Verified
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {vendor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {vendor.service}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {vendor.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      📞 {vendor.contact}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-lg font-bold text-gray-800">
                      Starting from ₹500
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleBookNow(vendor)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}