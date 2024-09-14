import { React, useEffect, useState } from "react";
import { web3, contract } from "../../utils";

function Details() {
  const fetchAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  };

  const [batchIds, setBatchIds] = useState([]);
  const [batchDetails, setBatchDetails] = useState([]);

  useEffect(() => {
    const fetchBatchIdsAndDetails = async () => {
      const batchIds = await contract.methods
        .getManufacturerBatches(await fetchAccount())
        .call();
      setBatchIds(batchIds);

      var allBatches = [];
      for (let i = 0; i < batchIds.length; i++) {
        const batch = await contract.methods.getBatch(batchIds[i]).call();
        allBatches.push(batch);
      }
      setBatchDetails(allBatches);

      contract.events
        .BatchProduced({ fromBlock: "latest" })
        .on("data", async () => {
          const batchIds = await contract.methods
            .getManufacturerBatches(await fetchAccount())
            .call();
          const updatedBatchDetails = [];
          for (let i = 0; i < batchIds.length; i++) {
            const batch = await contract.methods.getBatch(batchIds[i]).call();
            updatedBatchDetails.push(batch);
          }
          setBatchDetails(updatedBatchDetails);
        });
    };

    fetchBatchIdsAndDetails();
  }, []);

  return (
    <section className="details">
      <div className="detail">
        <h2>Recently Produced Batches</h2>
        <table>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Drug ID</th>
              <th>Expiry Date</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {batchDetails.map((batch, index) => (
              <tr key={index}>
                <td>{batch[0].toString()}</td>
                <td>{batch[1].toString()}</td>
                <td>{batch[2]}</td>
                <td>{batch[4].toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="detail">
        <h2>Notifications</h2>
        <ul className="notification-list">
          <li>Batch #789 has passed the quality check.</li>
          <li>Raw material stock for Chemical A is low.</li>
          <li>New batch production scheduled for tomorrow.</li>
          <li>Shipment #12348 is delayed due to logistical issues.</li>
          <li>Inspection for Batch #790 is scheduled for next week.</li>
        </ul>
      </div>
    </section>
  );
}

export default Details;
