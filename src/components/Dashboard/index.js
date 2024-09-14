import React from "react";

import Header from "./Header";
import Cards from "./Cards";
import Charts from "./Charts";
import Details from "./Details";
import Footer from "./Footer";
import RegisterManufacturer from "../ManuForms/RegisterManufacturer";
import AddDrug from "../ManuForms/AddDrug";
import AddBatch from "../ManuForms/AddBatch";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <AddDrug />
      <AddBatch />
      <Cards />
      <Charts />
      <Details />
      <Footer />
    </div>
  );
};

export default Dashboard;
