// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.13;

/// @title CashCow.quest main
/// @author parseb.eth
/// @notice VC seedstage prtocol
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com



import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';
import '@uniswap/v3-core/contracts/libraries/TickMath.sol';

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/base/LiquidityManagement.sol';

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';


contract CashCow is ERC721('Cash Cow Quest', 'COWQ') {
    address immutable zero = address(0);
    uint256 immutable MAXUINT = type(uint256).max;
    uint256 immutable UNISWAPV3_ADDRESS = 4;
    address immutable DAI_ADDRESS = 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063;


    constructor() {} 
}
