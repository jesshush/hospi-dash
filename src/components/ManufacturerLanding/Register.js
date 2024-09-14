import React, { useState } from "react";

function Register({ onRegister }) {
  const [manufacturerName, setManufacturerName] = useState("");
  const [manufacturerLocation, setManufacturerLocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(manufacturerName, manufacturerLocation);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4>Manufacturer Registration</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="manufacturerName">Manufacturer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturerName"
                  placeholder="Enter manufacturer name"
                  value={manufacturerName}
                  onChange={(e) => setManufacturerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturerLocation">
                  Manufacturer Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturerLocation"
                  placeholder="Enter manufacturer location"
                  value={manufacturerLocation}
                  onChange={(e) => setManufacturerLocation(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
