import React from 'react';

function Cards() {
  return (
    <section className="cards">
      <div className="card">
        <h2>Total Production</h2>
        <p>18,000 Units</p>
      </div>
      <div className="card">
        <h2>Verified Batches</h2>
        <p>75%</p>
      </div>
      <div className="card">
        <h2>Inventory Available</h2>
        <p>12,500 Units</p>
      </div>
      <div className="card special-card">
        <h2>Pending Shipments</h2>
        <p>15</p>
      </div>
    </section>
  );
}

export default Cards;
