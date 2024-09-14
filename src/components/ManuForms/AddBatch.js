import React, { useState } from "react";
import { contract } from "../../utils";
import { web3 } from "../../utils";
import Swal from "sweetalert2";

const AddBatch = () => {
  // State variables for form fields
  const [BatchId, setBatchId] = useState("");
  const [drugId, setDrugId] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantityProduced, setQuantityProduced] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Connect to Ethereum provider and contract
    if (window.ethereum) {
      const accounts = await web3.eth.getAccounts();

      try {
        // Call the addBatch function from the contract
        await contract.methods
          .addBatch(
            Number(BatchId),
            Number(drugId), // Assuming drugId is used for batchId as well; adjust if needed
            manufactureDate,
            expiryDate,
            Number(quantityProduced)
          )
          .send({ from: accounts[0], gas: 3000000 });

        contract.events
          .BatchProduced({
            fromBlock: "latest",
          })
          .on("data", function (event) {
            Swal.fire({
              icon: "success",
              title: "Batch Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } catch (error) {
        console.error("Error adding batch:", error);
        alert("Failed to add batch.");
      }
    } else {
      alert(
        "Ethereum provider not found. Install MetaMask or another Ethereum wallet."
      );
    }
  };

  return (
    <div>
      <h2>Add Batch</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="batchId">Batch ID:</label>
          <input
            type="number"
            id="batchId"
            value={BatchId}
            onChange={(e) => setBatchId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="drugId">Drug ID:</label>
          <input
            type="number"
            id="drugId"
            value={drugId}
            onChange={(e) => setDrugId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="manufactureDate">Manufacture Date:</label>
          <input
            type="date"
            id="manufactureDate"
            value={manufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantityProduced">Quantity Produced:</label>
          <input
            type="number"
            id="quantityProduced"
            value={quantityProduced}
            onChange={(e) => setQuantityProduced(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Batch</button>
      </form>
    </div>
  );
};

export default AddBatch;
