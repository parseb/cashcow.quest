import pytest
from brownie import accounts, chain, ZERO_ADDRESS, interface
from tests.conftest import CCOW, DAI, VC, IV3Factory, isPolygon



def test_default(isPolygon, CCOW, VC, DAI, IV3Factory):
    assert isPolygon
    assert CCOW.address != ZERO_ADDRESS
    assert interface.IERC20(VC.address).balanceOf(accounts[-2]) > 100_000
    assert interface.IERC20(DAI.address).balanceOf(accounts[-1]) > 100_000
    assert IV3Factory.owner() != ZERO_ADDRESS
    # assert DAI.decimals() == 18
    assert VC.decimals() == 18

def test_creates_deal(CCOW, DAI, VC):
    tempId = CCOW.tempId({'from': accounts[0]})
        # address _projectToken,
        # uint256 _giveAmount,
        # uint256 _wantsAmount,
        # uint256 _vestStart,
        # uint256 _vestEnd,
        # string memory _pitchDataURL
    DAI.transfer(accounts[1].address, 500000*10**18,  {"from": accounts[-1]})
    VC.approve(CCOW.address, 100000*10**18, {"from": accounts[0]})
    dealId = CCOW.createDeal(VC.address, 1_000, 20, 356, 356, "12345678912345678912345678900012", {'from': accounts[0]}).return_value

    assert dealId > 0
    deal = CCOW.getCashCowById(dealId)
    assert deal[0][0] == accounts[0] #deal creator
    assert deal[0][1] == ZERO_ADDRESS #deal taker - deal open
    assert deal[0][2] == VC.address #proposed token
    assert deal[1][0] == 1_000 * 10 ** 16 #project token amount
    assert deal[1][1] == 20 * 10 ** 16 #project token amount
    assert tempId < CCOW.tempId({'from': accounts[0]})