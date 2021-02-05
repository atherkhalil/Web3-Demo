# Web3 - Demo
A Web3 JS demo built using the Truffle framework, coupled with a Rest API and basic front-end.

## Installation & Setup
 The following steps will walk you through the installation of packages & setup of the project.
 
### Clone the repository
Let's clone this repository and navigate into it.

```bash
git clone https://github.com/atherkhalil/Web3-Demo.git
cd Web3-Demo
```

### Install Truffle framework

```bash
npm install -g truffle
```
This will install ```truffle``` globally on your system

### Compile the smart contract & build artifacts

First we will launch the truffle environment.

```bash
truffle develop
```
This will launch a ```truffle``` interactive console, which will look like this ```truffle(develop)>```.<br><br>
Once inside the console, run the following commands for compiling & deploying the smart contract to the Blockchain.

```bash
compile
```

```bash
migrate
```
The ```migrate``` command takes the compiled smart contract and deploys it to the Blockchain.

### Inject smart contract ABI & Address in the Rest API

Navigate to ```build/contracts``` and open ```Production.json```

copy the ```ABI``` object, which looks like this:

```bash
[
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "production",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "watts",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "logTime",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "source",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "watt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "source",
        "type": "string"
      }
    ],
    "name": "log_production",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "get_production",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "watts",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "source",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
```

Navigate to the ```app.js``` file and store the copied ```ABI``` in the ```abi``` variable.

This ```ABI``` contains the function input parameters and outputs of the fucntions defined in the smart contract. <br>
Web3 uses this ```ABI``` as an interface to invoke the smart contract functions.

Now copy the smart contract ```address``` from the ```truffle console``` which is outputted after the ```migrate``` command is run.
It will be something like this:

```bash
> contract address:    0x0BbD28754fA840e4AA253E6E530Bb8DAcfC0BF75
```

Paste the address in the ```contractAddresss``` variable in ```app.js``` file.

Now we're ready to use the Rest API to interact with the smart contract.

### Run the Rest API

Let's go ahead and lauch the Rest API.

```bash
node app
```

Open ```http://localhost:3000``` to view a simple interface to ```Log Production``` & ```Get Production```
