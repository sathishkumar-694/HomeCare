import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
 function Home() {
  return (
    <>
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-cust">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to HomeCare</h1>
      <p className="text-gray-700 mb-8 text-center max-w-xl">
        Find trusted service providers or offer your services. Quick onboarding,
        role selection, and simple workflows.
      </p>

      <div className="flex gap-4">
        <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg">Get Started</Link>
        <Link to="/role-selection" className="bg-white border px-5 py-2 rounded-lg">Choose Role</Link>
      </div>
    </main>
    </>
  );
}
export default Home;
