const express = require("express");
const app = express();
require("dotenv").config();
const Web3 = require("web3");
app.use(express.json({ extended: false }));
app.use(express.static(__dirname));
// Setup Web3 JS
let web3 = new Web3(process.env.RPC_URL);

// Populate provided accounts
const accounts = [];

web3.eth.getAccounts().then((e) => {
  e.forEach((ac) => {
    accounts.push(ac);
  });
});

// Contract ABI
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "watt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "source",
        type: "string",
      },
    ],
    name: "log_production",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "get_production",
    outputs: [
      {
        internalType: "uint256",
        name: "watts",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "source",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "production",
    outputs: [
      {
        internalType: "uint256",
        name: "watts",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "logTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "source",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Address of the contract provided by truffle
const contractAddress = "0x0BbD28754fA840e4AA253E6E530Bb8DAcfC0BF75";

// Initialize contract
const contract = new web3.eth.Contract(abi, contractAddress);

// Default empty route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Log production data
app.post("/log", async (req, res) => {
  console.log("request: " + JSON.stringify(req.body));
  try {
    const log = await contract.methods
      .log_production(req.body.watts, req.body.timestamp, req.body.source)
      .send({ from: "0x8472E6829Fc909998bD77771B745b96bEb8dc39B" });

    return res.json(log);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Get production data
app.get("/get/:timestamp", async (req, res) => {
  try {
    const get = await contract.methods
      .get_production(req.params.timestamp)
      .call({ from: accounts[0] });

    return res.json(get);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
