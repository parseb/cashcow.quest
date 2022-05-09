// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

/// @title CashCow.quest main
/// @author parseb.eth
/// @notice VC seedstage protocol
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../interfaces/IUniswapV3Pool.sol";
import "../interfaces/IUniswapV3Factory.sol";

contract CashCow is ERC721("Cash Cow Quest", "COWQ") {
    uint256 immutable MAXUINT = type(uint256).max-1;
    IUniswapV3Factory UniFactory;
    IERC20 DAI;

    uint256 public tempId;

    //// Errors
    error TokenTransferFailed(address _token, uint256 _amount);

    //// Events
    event NewDealProposed(address indexed _token, uint256 indexed _Tempid);
    event RefundedNoDeal(
        uint256 indexed _Tempid,
        address indexed _token,
        address _caller
    );

    constructor(address _dai, address _uniV3factory) {
        UniFactory = IUniswapV3Factory(_uniV3factory);
        DAI = IERC20(_dai);
        DAI.approve(_uniV3factory, MAXUINT); 
        tempId = 1;
    }

    struct Cow {
        address[3] owners; //[seller, buyer, projectToken]
        uint256[2] amounts; //[giveAmount, takeAmount]
        uint256[2] vestStartEnd; //[vestStart, vestEnd]
        string data; //url
    }

    /// @notice Stores Cow with getter function from 721-721 ID
    mapping(uint256 => Cow) cashCowById;

    /// @notice Proposes a new deal
    /// @param _projectToken address of offered token
    /// @param _giveAmountx100 amount of offered tokens
    /// @param _wantsAmountx100 amount of DAI per _projectToken (1=0.01) [1 _projectToken <-> _wantsAmount * 100]
    /// @param _vestStart vesting period starts _ days after deal minted
    /// @param _vestEnd vesting period ends _ days after _vestStart
    function createDeal(
        address _projectToken,
        uint256 _giveAmountx100,
        uint256 _wantsAmountx100,
        uint256 _vestStart,
        uint256 _vestEnd,
        string memory _pitchDataURL
    ) public returns (uint256 tId) {
        require(_projectToken != address(0), "Token is zero");
        require(bytes(_pitchDataURL).length <= 32, "URL too long");
        require(
            _wantsAmountx100 * _giveAmountx100 * _vestStart * _vestEnd > 0,
            "0 value not allowed"
        );

        if (
            IERC20(_projectToken).transferFrom(
                msg.sender,
                address(this),
                _giveAmountx100 * 10**16
            )
        ) {
            cashCowById[tempId] = Cow(
                [msg.sender, address(0), _projectToken],
                [_giveAmountx100 * 10**16, _wantsAmountx100 * 10**16],
                [_vestStart, _vestEnd],
                _pitchDataURL
            );

            tId = tempId;
            unchecked {
                tempId++;
            }

            emit NewDealProposed(_projectToken, tId);
        } else {
            revert TokenTransferFailed(_projectToken, _giveAmountx100 * 10**16);
        }
    }

    function takeDeal(uint256 _dealId)
        public
        returns (address pool)
    {
        require(_dealId != 0, "Deal is zero");
        Cow memory cow = cashCowById[_dealId];
        require(cow.owners[1] == address(0), "Deal already taken");
        require(cow.owners[0] != address(0), "Deal not found");
        require(DAI.allowance(msg.sender, address(this)) >= cow.amounts[1], "Not enough DAI");
        require(DAI.transferFrom(msg.sender, address(this), cow.amounts[1]), "Token transfer failed");
        IERC20(cow.owners[2]).approve(address(UniFactory), MAXUINT); 

        cashCowById[_dealId].owners[1] = msg.sender;

        pool = UniFactory.getPool(cow.owners[2], address(DAI), 10000);
        if (pool == address(0)) {
            pool = UniFactory.createPool(cow.owners[2], address(DAI), 10000);
        }

        return pool;
    }

    /// @notice Cancel public offering
    function reclaimNone(uint256 _id) public returns (bool s) {
        Cow memory cow = cashCowById[_id];
        require(
            cow.owners[0] == msg.sender && cow.owners[1] == address(0),
            "Cow Unreachable"
        );
        delete cashCowById[_id];

        s = IERC20(cow.owners[2]).transfer(msg.sender, cow.amounts[0]);
        require(s, "Refund Failed");

        emit RefundedNoDeal(_id, cow.owners[2], msg.sender);
    }

    // _setTokenURI(_tempId, "https://cashcow.quest/token/" + _tempId);

    /// VIEW FUNCTIONS

    function getCashCowById(uint256 _id) public view returns (Cow memory) {
        return cashCowById[_id];
    }
}
