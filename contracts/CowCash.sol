// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CowCash is ERC20("Cash for Cow", "CFORC") {
    address owner;
    address owner_tobe;

    constructor() {
        owner = msg.sender;
    }

    /// @notice safe transfer ownership
    /// @dev not in use atm
    function changeOwner(address _nextOwner) external returns (address) {
        require(msg.sender == owner, "Only owner can change owner");
        if (owner_tobe != address(0) && owner_tobe != owner) owner = owner_tobe;
        owner_tobe = _nextOwner;
    }

    function mint(address _to, uint256 _amount) external returns (uint256 b0) {
        require(_to != address(0), "Token is zero");
        require(msg.sender == owner, "Only owner can mint");
        b0 = balanceOf(_to);
        _mint(_to, _amount);
        b0 = balanceOf(_to) - b0;
        require(b0 == _amount, "Mint failed");
    }
}
