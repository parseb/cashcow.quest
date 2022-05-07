// SPDX-License-Identifier: UNLICENSED
pragma solidity  0.8.13;

/// @title CashCow.quest main
/// @author parseb.eth
/// @notice VC seedstage prtocol
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';


contract CashCow is ERC721('Cash Cow Quest', 'COWQ') {
    address immutable zero = 0x0000000000000000000000000000000000000000;
    uint256 immutable MAXUINT = type(uint256).max;
    address immutable UNISWAPV3_ADDRESS;
    address immutable DAIaddr;


    constructor(address _dai, address _uniV3factory) {
        UNISWAPV3_ADDRESS = _uniV3factory;
        DAIaddr = _dai;
    } 
}