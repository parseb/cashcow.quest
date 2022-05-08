import pytest
from brownie import accounts, chain, ZERO_ADDRESS, interface
from tests.conftest import CCOW, DAI, VC, IV3Factory, isPolygon



def test_default(isPolygon, CCOW, VC, DAI, IV3Factory):
    assert isPolygon
    assert CCOW.address != ZERO_ADDRESS
    assert interface.IERC20(VC.address).balanceOf(accounts[-2]) > 100_000
    assert interface.IERC20(DAI.address).balanceOf(accounts[-1]) > 100_000
    assert IV3Factory.owner() != ZERO_ADDRESS

def test_creates_deal(CCOW, DAI, VC):
    dealId = CCOW.createDeal(VC.address, 1_000, 500, 100_000, 356, 356, {'from': accounts[0]})
    assert dealId > 0
    deal = CCOW.getDeal(dealId)
    assert deal[0][0] == accounts[0] #deal creator
    assert deal[0][1] == ZERO_ADDRESS #deal taker - deal open
    assert deal[1][0] == 1_000 #project token amount
    assert deal[1][1] == 500 #project token amount
    assert deal[2][0] > chain.time #deal start time
    assert deal[2][1] > deal[2][0] * 8640 + chain.time  #deal end time