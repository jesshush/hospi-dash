// src/utils/index.js
import Web3 from "web3";
import contractABI from "../contracts/ManufactureEntity.json";

// Connect to the Ethereum network
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

// Contract ABI and address
const contractAddress = "0xBcb7868DAFB5e90A9DC734BF22C1976B5A455D0A"; // Replace with your contract address

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export { web3, contract };
