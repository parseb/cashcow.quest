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

import {ISuperfluid} from "parseb/protocol-monorepo@brownie-v1.2.2/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "parseb/protocol-monorepo@brownie-v1.2.2/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {IInstantDistributionAgreementV1} from "parseb/protocol-monorepo@brownie-v1.2.2/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
import {CFAv1Library} from "parseb/protocol-monorepo@brownie-v1.2.2/contracts/apps/CFAv1Library.sol";

contract CashCow is ERC721("Cash Cow Quest", "COWQ") {
    uint256 immutable MAXUINT = type(uint256).max - 1;
    IUniswapV2Factory UniFactory;
    IERC20 DAI;
    IUniswapV2Router01 V2Router;
    address public immutable sweeper;
    uint256 public tempId;

    /// superfluid
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1;

    //// Errors
    error TokenTransferFailed(address _token, uint256 _amount);

    //// Events
    event NewDealProposed(address indexed _token, uint256 indexed _Tempid);
    event RefundedNoDeal(
        uint256 indexed _Tempid,
        address indexed _token,
        address _caller
    );
    event LiquidatedDeal(uint256 indexed _dealId, address indexed _token);

    constructor(
        address _dai,
        address _unifactory,
        address _v2Router,
        address _sweepTo,
        address _superfluidHost
    ) {
        UniFactory = IUniswapV2Factory(_unifactory);
        V2Router = IUniswapV2Router01(_v2Router);
        DAI = IERC20(_dai);
        DAI.approve(_v2Router, MAXUINT);
        sweeper = _sweepTo;
        tempId = 1;
        ISuperfluid host = ISuperfluid(_superfluidHost);

        cfaV1 = CFAv1Library.InitData(
        host,
        //here, we are deriving the address of the CFA using the host contract
        IConstantFlowAgreementV1(
            address(host.getAgreementClass(
                    keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                ))
            )
        );
    }

    struct Cow {
        address[4] owners; //[seller, buyer, projectToken, poolAddress]
        uint256[3] amounts; //[giveAmountProjectToken, takeAmountDAI, poolTokenBalance]
        uint256[2] vestStartEnd; //[vestStart, vestEnd]
        string data; //url
    }

    /// @notice Stores Cow with getter function from 721-721 ID
    mapping(uint256 => Cow) cashCowById;
    mapping(uint256 => string) _tokenURIs;

    /// modifiers
    modifier timeElapsed(uint256 _id) {
        require(_exists(_id), "None Found");
        Cow memory cow = cashCowById[_id];
        require(cow.owners[1] == msg.sender, "Not Owner");
        require(ownerOf(_id) == msg.sender, "Not Owner");
        require(cow.vestStartEnd[1] <= block.timestamp, "Not Ready");
        _;
    }

    ///

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
    ) external returns (uint256 tId) {
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
                [_giveAmountx100 * 10**16, _wantsAmountx100 * 10**16, 0],
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
    function takeDeal(uint256 _dealId) external returns (address pool) {
        Cow memory cow = cashCowById[_dealId];
        require(cow.owners[1] == address(0), "Deal already taken");
        require(cow.owners[0] != address(0), "Deal not found");
        require(
            DAI.allowance(msg.sender, address(this)) >= cow.amounts[1],
            "Not enough DAI"
        );
        require(
            DAI.transferFrom(msg.sender, address(this), cow.amounts[1]),
            "Token transfer failed"
        );

        cow.owners[1] = msg.sender;

        uint256 ofPoolBalance;
        pool = UniFactory.getPair(cow.owners[2], address(DAI));
        if (pool != address(0)) {
            ofPoolBalance = IERC20(pool).balanceOf(address(this));
        } else {
            pool = UniFactory.createPair(cow.owners[2], address(DAI));
            maxApprove(address(V2Router), cow.owners[2]);
        }

        cow.owners[3] = pool;

        V2Router.addLiquidity(
            cow.owners[2],
            address(DAI),
            cow.amounts[0],
            cow.amounts[1],
            cow.amounts[0],
            cow.amounts[1],
            address(this),
            block.timestamp
        );

        // mint - update vest startend
        uint256 vestStart = block.timestamp + (cow.vestStartEnd[0] * 1 days);
        cow.vestStartEnd = [
            vestStart,
            vestStart + (cow.vestStartEnd[1] * 1 days)
        ];
        cow.amounts[2] = ofPoolBalance == 0
            ? IERC20(pool).balanceOf(address(this))
            : IERC20(pool).balanceOf(address(this)) - ofPoolBalance;

        _mint(cow.owners[1], _dealId);
        require(setTokenUri(_dealId, string(cow.data)), "Failed to set URI");

        cashCowById[_dealId] = cow;
        return pool;
    }

    function setTokenUri(uint256 _tokenId, string memory _URI)
        internal
        returns (bool)
    {
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
    function reclaimNoTakers(uint256 _id) external returns (bool s) {
        Cow memory cow = cashCowById[_id];
        require(
            cow.owners[0] == msg.sender && cow.owners[1] == address(0),
            "Cow Interrupted"
        );
        delete cashCowById[_id];

        s = IERC20(cow.owners[2]).transfer(msg.sender, cow.amounts[0]);
        require(s, "Refund Failed");

        emit RefundedNoDeal(_id, cow.owners[2], msg.sender);
    }

    /// @notice liquidate
    function LiquidateDeal(uint256 _dealId)
        external
        timeElapsed(_dealId)
        returns (bool s)
    {
        Cow memory cow = cashCowById[_dealId];
        cow.owners[1] = address(0);
        //IERC20(cow.owners[3]).approve(address(V2Router), cow.amounts[2]);
        uint256 amount = cow.amounts[2] / 2;
        s = IERC20(cow.owners[3]).transfer(msg.sender, amount);
        require(
            IERC20(cow.owners[3]).transfer(cow.owners[0], amount) && s,
            "Failed Transfers"
        );

        emit LiquidatedDeal(_dealId, cow.owners[2]);
        _burn(_dealId);
    }

    /// @notice pump and commit
    function VestDeal(uint256 _dealId)
        external
        timeElapsed(_dealId)
        returns (bool s)
    {
        // with optional user data
        // cfaV1.createFlow(receiver, token, flowRate, userData);
        // cfaV1.updateFlow(receiver, token, flowRate, userData);
        // cfaV1.deleteFlow(sender, receiver, token, userData);

        // receiver - the address of the receiver
        // token - the ISuperToken used in the flow
        // flowRate - an int96 variable which represents the total amount of the token you'd like to send per second, denominated in wei

    }

    /// VIEW FUNCTIONS

    function getCashCowById(uint256 _id) public view returns (Cow memory) {
        return cashCowById[_id];
    }

    /// Override

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return _tokenURIs[_tokenId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from != address(0))
            require(from == cashCowById[tokenId].owners[1], "Not your token");
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from != address(0)) cashCowById[tokenId].owners[1] = to;
        if (to == address(0)) delete cashCowById[tokenId];
    }
}
