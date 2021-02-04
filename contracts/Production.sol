// SPDX-License-Identifier: MIT
pragma solidity >=0.5.9;

contract Production {
  
  struct ProductionData{
      uint watts;
      uint logTime;
      string source;
  }
  
  mapping (uint => ProductionData) public production;

  function log_production(uint watt, uint timestamp, string memory source) public {
      ProductionData memory data;
      data.watts = watt;
      data.logTime = timestamp;
      data.source = source;
      production[timestamp] = data;
  }

  function get_production(uint time) public view returns (uint watts, uint date, string memory source){
    return (production[time].watts, production[time].logTime, production[time].source);
  }
}


