import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";
import LandingPage from "./components/ManufacturerLanding";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
