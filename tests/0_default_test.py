import pytest
from brownie import accounts, chain, ZERO_ADDRESS, interface
from tests.conftest import CCOW, DAI, VC, IV3Factory, isPolygon
from brownie import reverts as revs


def test_default(isPolygon, CCOW, VC, DAI, IV3Factory):
    assert isPolygon
    assert CCOW.address != ZERO_ADDRESS
    assert interface.IERC20(VC.address).balanceOf(accounts[-2]) > 100_000
    assert interface.IERC20(DAI.address).balanceOf(accounts[-1]) > 100_000
    #assert IV3Factory.owner() != ZERO_ADDRESS
    # assert DAI.decimals() == 18
    # assert VC.decimals() == 18

def test_creates_deal(CCOW, DAI, VC):
    tempId = CCOW.tempId({'from': accounts[0]})
        # address _projectToken,
        # uint256 _giveAmount,
        # uint256 _wantsAmount,
        # uint256 _vestStart,
        # uint256 _vestEnd,
        # string memory _pitchDataURL
    howMuchProjectToken = 1_000
    howMuchDAI = 20

    DAI.transfer(accounts[1].address, 500000*10**18,  {"from": accounts[-1]})
    VC.approve(CCOW.address, 100000*10**18, {"from": accounts[0]})
    dealId = CCOW.createDeal(VC.address, howMuchProjectToken, howMuchDAI, 356, 356, "12345678912345678912345678900012", {'from': accounts[0]}).return_value

    assert dealId > 0
    deal = CCOW.getCashCowById(dealId)
    assert deal[0][0] == accounts[0] #deal creator
    assert deal[0][1] == ZERO_ADDRESS #deal taker - deal open
    assert deal[0][2] == VC.address #proposed token
    assert deal[1][0] == 1_000 * 10 ** 16 #project token amount
    assert deal[1][1] == 20 * 10 ** 16 #project token amount
    assert tempId < CCOW.tempId({'from': accounts[0]})

    DAI.approve(CCOW.address, 100000*10**18, {"from": accounts[1]})


    pool = CCOW.takeDeal(1, {'from': accounts[1]}).return_value
    assert pool != ZERO_ADDRESS
    deal = CCOW.getCashCowById(1)
    assert deal[0][0] == accounts[0] #deal creator
    assert deal[0][1] == accounts[1] #deal taker - deal open
    assert deal[0][2] == VC.address #proposed token
    assert deal[00][3] == pool #vest start
    assert deal[1][0] == howMuchProjectToken * 10 ** 16 #project token amount
    assert deal[1][1] == howMuchDAI * 10 ** 16 #denominator token amount
    assert (deal[2][1] - deal[2][0]) / 86400 == 356

    with revs("Deal already taken"):
        CCOW.takeDeal(1, {'from': accounts[0]})
    
    with revs():
        CCOW.takeDeal(1, {'from': accounts[1]})

    with revs("Deal already taken"):
        CCOW.takeDeal(1, {'from': accounts[5]})

    with revs("DealID 0"):
        CCOW.takeDeal(0, {'from': accounts[5]})

    with revs("Deal not found"):
        CCOW.takeDeal(345345, {'from': accounts[5]})

    assert interface.IERC20(pool).balanceOf(CCOW.address) > 1

def test_create_uni2pool(CCOW, DAI, VC, IV3Factory):
    pytest.skip("not implemented")
    

