// src/components/RegisterManufacturer.js
import React, { useState } from "react";
import { web3, contract } from "../../utils/index";

const RegisterManufacturer = () => {
  const [manufacturerName, setManufacturerName] = useState("");
  const [manufacturerLocation, setManufacturerLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .registerManufacturer(manufacturerName, manufacturerLocation)
      .send({ from: accounts[0] });
    alert("Manufacturer Registered!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Manufacturer</h2>
      <label>
        Name:
        <input
          type="text"
          value={manufacturerName}
          onChange={(e) => setManufacturerName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={manufacturerLocation}
          onChange={(e) => setManufacturerLocation(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterManufacturer;
