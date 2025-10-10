import React from "react";
import { Link } from "react-router-dom";
import DomainCard from "../Components/DomainCard";

const domains = [
  { id: 1, name: "Plumbing", route: "/domain/plumbing" },
  { id: 2, name: "Cleaning", route: "/domain/cleaning" },
  { id: 3, name: "Salon", route: "/domain/salon" },
  { id: 4 , name : "Bike Repair" , route:"/domain/bike-repair"} ,
  { id: 5 , name : "Home Appliances Repair" , route:"/domain/appliances-repair"}

];

function ClientPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Choose a Service Domain</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <Link key={domain.id} to={domain.route}>
            <DomainCard title={domain.name} />
            <Link to="/domain/plumbing"></Link>
            <Link to="/domain/cleaning"></Link>
            <Link to="/domain/salon"></Link>
            <Link to="/domain/bike-repair"></Link>
            <Link to="/domain/appliances-repair"></Link>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClientPage;