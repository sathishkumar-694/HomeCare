import React from "react";
import ServiceCard from "../Components/ServiceCard";

// Import images from assets
import plumberImg from "D://HomeCare//client//src//assets//plumber.jpg";
import cleanerImg from "D://HomeCare//client//src//assets//cleaner.webp";
import barberImg from "D://HomeCare//client//src//assets//barber.jpg"

function ClientPage() {
  return (
    <div className="grid gap-6 p-6 md:grid-cols-2">
      <ServiceCard
        name="Ramesh Kumar"
        service="Plumber"
        desc="Expert in fixing water leaks and pipe installations."
        photo={plumberImg}   // ✅ Use local asset
      />

      <ServiceCard
        name="Anita Sharma"
        service="Cleaner"
        desc="Professional home and office cleaning services."
        photo={cleanerImg}
      />

      <ServiceCard
        name="Ramesh Kumar"
        service="Hair stylist"
        desc="Professional hair stylist."
        photo={barberImg} 
      />

    </div>
  );
}

export default ClientPage;
