// Load Web3
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  await window.ethereum.enable();
  const web3 = window.web3;
} else {
  web3 = new Web3("http://localhost:9545");
}
