import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function RoleSelection() {
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  function handleContinue() {
    // for now navigate to signup and pass chosen role in state
    navigate("/signup", { state: { role } });
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <h2 className="text-3xl font-bold mb-2">Choose Your Role</h2>
      <p className="text-gray-700 mb-6">Select the role that best describes you to continue.</p>

      <div className="w-full max-w-3xl space-y-4">
        <label className={`flex items-center border rounded-xl p-4 cursor-pointer ${role === "client" ? "ring-2 ring-blue-200" : ""}`}>
          <input type="radio" name="role" value="client" checked={role === "client"} onChange={() => setRole("client")} className="mr-4" />
          <div>
            <div className="font-medium">Client</div>
            <div className="text-sm text-gray-500">Hire professionals for your projects.</div>
          </div>
        </label>

        <label className={`flex items-center border rounded-xl p-4 cursor-pointer ${role === "provider" ? "ring-2 ring-blue-200" : ""}`}>
          <input type="radio" name="role" value="provider" checked={role === "provider"} onChange={() => setRole("provider")} className="mr-4" />
          <div>
            <div className="font-medium">Service Provider</div>
            <div className="text-sm text-gray-500">Offer your services and connect with clients.</div>
          </div>
        </label>
      </div>

      <div className="mt-6">
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
