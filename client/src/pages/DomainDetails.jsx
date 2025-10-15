import React, { useState } from "react";

function DomainDetails() {
  const [showServices, setShowServices] = useState(false);

  // Sample services list
  const services = [
    { name: "Plumbing", description: "Fix leaks, install pipes, and more." },
    { name: "Electrical Repairs", description: "Lighting, wiring, and power solutions." },
    { name: "Home Cleaning", description: "Professional cleaning for your home or office." },
    { name: "Salon at Home", description: "Beauty and grooming services at your doorstep." },
    { name: "Appliance Repair", description: "Fridge, washing machine, and AC repairs." },
    { name: "Painting", description: "Interior and exterior home painting." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowServices(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {!showServices ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center"
        >
          <h1 className="text-2xl font-semibold mb-4 text-gray-700">
            Welcome Client 👋
          </h1>
          <p className="text-gray-500 mb-6">
            Click below to explore our service domains.
          </p>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Our Service Domains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowServices(false)}
            className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default DomainDetails;
