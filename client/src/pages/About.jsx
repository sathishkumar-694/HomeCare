import React from "react";
const reviews = [
  {
    name: "Ananya Sharma",
    review:
      "Amazing service! I booked a home cleaning and the team was punctual, polite, and did a great job. Highly recommended!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    review:
      "I loved the ease of booking. The plumber came on time and fixed the issue quickly. Great experience!",
    rating: 4,
  },
  {
    name: "Priya Iyer",
    review:
      "This platform makes life so much easier. Affordable, reliable, and super friendly staff. I’ll use it again!",
    rating: 5,
  },
];
export default function About() {
  return (
    <div className="min-h-screen bg-cust flex items-center justify-center p-6" >
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          💬 What People Say About Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We value every experience. Here’s what our happy customers shared.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start"
            >
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 text-lg">
                  {"⭐".repeat(r.rating)}
                </span>
              </div>
              <p className="text-gray-700 italic mb-4">“{r.review}”</p>
              <h3 className="text-gray-900 font-semibold">– {r.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
