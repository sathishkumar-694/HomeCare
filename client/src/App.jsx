import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./Components/Footer"
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;