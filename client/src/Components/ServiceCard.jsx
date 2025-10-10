import React from "react";

function ServiceCard({ name, service, desc, photo }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
      {/* Left side: text */}
      <div className="flex-1 pr-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-500">{service}</p>
        <p className="mt-2 text-gray-700">{desc}</p>
        <button
                onClick={() => navigate(`/payment/${service.id}`, { state: service })}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
      </div>

      {/* Right side: photo */}
      <div className="w-20 h-20 rounded-full overflow-hidden border shadow">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ServiceCard;
