// src/data.js

// Import your images here
import plumberImg from "./assets/plumber.jpg";
import cleanerImg from "./assets/barber.jpg";
import barberImg from "./assets/barber.jpg";

// List of available services
export const services = [
  { id: 1, name: "Plumbing", description: "Fix leaks and pipelines", price: 500 },
  { id: 2, name: "Home Cleaning", description: "Deep cleaning service", price: 800 },
  { id: 3, name: "Salon at Home", description: "Personal grooming at home", price: 600 },
];

// List of available providers, linked by the 'service' key
export const providers = [
  {
    id: 101,
    name: "Ramesh Kumar",
    service: "Plumbing", // This matches a service name
    desc: "Expert in fixing water leaks and pipe installations.",
    photo: plumberImg,
  },
  {
    id: 102,
    name: "Suresh Singh",
    service: "Plumbing",
    desc: "24/7 emergency plumbing services available.",
    photo: plumberImg, // You can use different photos
  },
  {
    id: 103,
    name: "Anita Sharma",
    service: "Home Cleaning",
    desc: "Professional home and office cleaning services.",
    photo: cleanerImg,
  },
  {
    id: 104,
    name: "Vikram Mehta",
    service: "Salon at Home",
    desc: "Professional men's and women's hairstylist.",
    photo: barberImg,
  },
];