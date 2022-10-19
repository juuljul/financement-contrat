// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

error FinanceContrat__NotOwner();

contract FinanceContrat {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 10**18;
    address private immutable i_owner;
    address[] private funders;
    mapping(address => uint256) private addressToAmount;
    AggregatorV3Interface private priceAggregator;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert FinanceContrat__NotOwner();
        _;
    }

    constructor(address priceFeed) {
        priceAggregator = AggregatorV3Interface(priceFeed);
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceAggregator) >= MINIMUM_USD,
            "Pas assez de ETH pour le contrat!"
        );
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "....");
        addressToAmount[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmount[funder] = 0;
        }
        funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getAmountFromAddress(address fundingAddress) public view returns (uint256)
    {
        return addressToAmount[fundingAddress];
    }

    function getVersion() public view returns (uint256) {
        return priceAggregator.version();
    }

    function getFunder(uint256 index) public view returns (address) {
        return funders[index];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceAggregator() public view returns (AggregatorV3Interface) {
        return priceAggregator;
    }
}
