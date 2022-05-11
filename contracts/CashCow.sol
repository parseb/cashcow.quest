// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

/// @title CashCow.quest main
/// @author parseb.eth
/// @notice VC seedstage protocol
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../interfaces/IUniswapV2Interfaces.sol";

contract CashCow is ERC721("Cash Cow Quest", "COWQ") {
    uint256 immutable MAXUINT = type(uint256).max - 1;
    IUniswapV2Factory UniFactory;
    IERC20 DAI;
    IUniswapV2Router01 V2Router;

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

    constructor(
        address _dai,
        address _unifactory,
        address _v2Router
    ) {
        UniFactory = IUniswapV2Factory(_unifactory);
        V2Router = IUniswapV2Router01(_v2Router);
        DAI = IERC20(_dai);
        DAI.approve(_v2Router, MAXUINT);
        tempId = 1;
    }

    struct Cow {
        address[4] owners; //[seller, buyer, projectToken, poolAddress]
        uint256[2] amounts; //[giveAmountProjectToken, takeAmountDAI]
        uint256[2] vestStartEnd; //[vestStart, vestEnd]
        string data; //url
    }

    /// @notice Stores Cow with getter function from 721-721 ID
    mapping(uint256 => Cow) cashCowById;
    
    mapping(uint256 => string) _tokenURIs;


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
        require(_vestStart * _vestEnd != 0, "Vesting period is zero");
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
                [msg.sender, address(0), _projectToken, address(0)],
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

    /// @notice Buy in a seed token vesting deal
    /// @dev _dealId is also the future ID of the deal's NFT 
    /// @param _dealId deal ID to buy 
    function takeDeal(uint256 _dealId) public returns (address pool) {
        require(_dealId != 0, "DealID 0");
        Cow memory cow = cashCowById[_dealId];
        require(cow.owners[0] != address(0), "Deal not found");
        require(cow.owners[1] == address(0), "Deal already taken");
        cow.owners[1] = msg.sender;

        require(
            DAI.allowance(msg.sender, address(this)) >= cow.amounts[1],
            "Not enough DAI"
        );
        require(
            DAI.transferFrom(msg.sender, address(this), cow.amounts[1]),
            "Token transfer failed"
        );


        pool = UniFactory.getPair(cow.owners[2], address(DAI));
        if (pool == address(0))
            pool = UniFactory.createPair(cow.owners[2], address(DAI));
        cow.owners[3] = pool;
        maxApprove(address(V2Router), cow.owners[2]);
        V2Router.addLiquidity(
            cow.owners[2],
            address(DAI),
            cow.amounts[0],
            cow.amounts[1],
            cow.amounts[0],
            cow.amounts[0],
            address(this),
            block.timestamp
        );

        // mint - update vest startend
        uint vestStart = block.timestamp + ( cow.vestStartEnd[0] * 1 days );
        cow.vestStartEnd = [ vestStart,  vestStart + ( cow.vestStartEnd[1] * 1 days ) ];

        _mint(cow.owners[1], _dealId);
        require(setTokenUri(_dealId, string(cow.data)), "Failed to set URI");
        
        cashCowById[_dealId] = cow;
        return pool;
    }



    function setTokenUri(uint256 _tokenId, string memory _URI) internal returns (bool) {
        require(_exists(_tokenId), "Token does not exist");
        _tokenURIs[_tokenId] = _URI;
        return true;
    }


    function maxApprove(address _router, address _projectToken)
        private
        returns (bool)
    {
        return
            DAI.approve(_router, MAXUINT) &&
            IERC20(_projectToken).approve(_router, MAXUINT);
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

    function __sqrt(uint256 _x) internal pure returns (uint256 y) {
        uint256 z = (_x + 1) / 2;
        y = _x;
        while (z < y) {
            y = z;
            z = (_x / z + z) / 2;
        }
    }


    /// Override

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return _tokenURIs[_tokenId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from != address(0)) require(from == cashCowById[tokenId].owners[1], "Not your token");
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from != address(0)) cashCowById[tokenId].owners[1] = to;
    }


}
