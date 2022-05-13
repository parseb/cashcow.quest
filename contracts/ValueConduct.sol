// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ValueConduct is ERC20("Value Conduct", "VC") {
    constructor(address _mint1milTo) {
        _mint(_mint1milTo, 1_000_000_000 * 10**18);
        _mint(msg.sender, 1_000_000_000 * 10**18);
    }
}
