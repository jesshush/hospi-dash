import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { web3, contract } from "../../utils";
import Swal from "sweetalert2";

function LandingPage() {
  const navigate = useNavigate();

  const handleRegister = async (manufacturerName, manufacturerLocation) => {
    if (window.ethereum.isMetaMask) {
      var accounts = await web3.eth.getAccounts();
    }
    try {
      await contract.methods
        .registerManufacturer(manufacturerName, manufacturerLocation)
        .send({ from: accounts[0], gas: 3000000 });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    contract.events
      .ManufacturerRegistered({ fromBlock: "latest" })
      .on("data", async function (event) {
        Swal.fire({
          icon: "success",
          title: "Success",
          html: `Manufacturer ${manufacturerName} has been registered successfully! <br>
          Transaction Hash: <code> ${event.transactionHash} </code> <br>`,
        });
        navigate("/dashboard");
      });
  };

  const handleLogin = async () => {
    if (window.ethereum.isMetaMask) {
      var accounts = await web3.eth.getAccounts();
    }
    try {
      var manufacturer = await contract.methods
        .getManufacturer(accounts[0])
        .call();
      Swal.fire({
        icon: "success",
        title: "Success",
        html: `Manufacturer ${manufacturer[1]} is logged in successfully!`,
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 m-3">
          <Register onRegister={handleRegister} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
