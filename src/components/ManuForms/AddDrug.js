// src/components/AddDrug.js
import React, { useState } from "react";
import { web3, contract } from "../../utils/index";

const AddDrug = () => {
  const [drugId, setDrugId] = useState("");
  const [drugName, setDrugName] = useState("");
  const [drugType, setDrugType] = useState("");
  const [drugPrice, setDrugPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .addDrug(
        drugId,
        drugName,
        drugType,
        drugPrice,
        totalQuantity,
        description
      )
      .send({ from: accounts[0], gas: 3000000 });
    alert("Drug Added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Drug</h2>
      <label>
        Drug ID:
        <input
          type="number"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Type:
        <input
          type="text"
          value={drugType}
          onChange={(e) => setDrugType(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={drugPrice}
          onChange={(e) => setDrugPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Drug</button>
    </form>
  );
};

export default AddDrug;
