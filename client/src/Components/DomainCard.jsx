import React from "react";

function DomainCard({ title, icon }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition flex flex-col items-center">
      {/* Optional Icon */}
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
  );
}

export default DomainCard;
