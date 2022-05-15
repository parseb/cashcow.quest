import pytest
from brownie import accounts, chain, ZERO_ADDRESS, interface
from tests.conftest import CCOW, DAI, VC, IV3Factory, isPolygon, V2Router
from brownie import reverts as revs


def test_default(isPolygon, CCOW, VC, DAI, IV3Factory):
    assert isPolygon
    assert CCOW.address != ZERO_ADDRESS
    assert interface.IERC20(VC.address).balanceOf(accounts[-2]) > 100_000
    assert interface.IERC20(DAI.address).balanceOf(accounts[-1]) > 100_000
    #assert IV3Factory.owner() != ZERO_ADDRESS
    # assert DAI.decimals() == 18
    # assert VC.decimals() == 18

def test_happy_cow(CCOW, DAI, VC):
    tempId = CCOW.tempId({'from': accounts[0]})
    howMuchProjectToken = 1_000
    howMuchDAI = 20

    DAI.transfer(accounts[1].address, 700000*10**18,  {"from": accounts[-1]})
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
    
    DAI.approve(CCOW.address, 1000000*10**18, {"from": accounts[1]})


    pool = CCOW.takeDeal(1, {'from': accounts[1]}).return_value
    assert pool != ZERO_ADDRESS
    deal = CCOW.getCashCowById(1)
    assert deal[0][0] == accounts[0] #deal creator
    assert deal[0][1] == accounts[1] #deal taker - deal open
    assert deal[0][2] == VC.address #proposed token
    assert deal[0][3] == pool #vest start
    assert deal[1][0] == howMuchProjectToken * 10 ** 16 #project token amount
    assert deal[1][1] == howMuchDAI * 10 ** 16 #denominator token amount
    assert deal[1][2] > 1 #pool token amount
    assert (deal[2][1] - deal[2][0]) / 86400 == 356

    assert interface.IERC20(pool).balanceOf(CCOW.address) > 100_000

    with revs("Deal already taken"):
        CCOW.takeDeal(1, {'from': accounts[0]})

    with revs("Deal already taken"):
        CCOW.takeDeal(1, {'from': accounts[5]})

    with revs("Deal not found"):
        CCOW.takeDeal(345345, {'from': accounts[5]})

    assert interface.IERC20(pool).balanceOf(CCOW.address) > 1

    assert interface.IERC721(CCOW).balanceOf(accounts[1].address) == 1
    assert CCOW.balanceOf(accounts[1].address, {"from": accounts[4]}) == 1
    CCOW.safeTransferFrom(accounts[1].address, accounts[4].address, 1, {'from': accounts[1]})
    assert CCOW.balanceOf(accounts[1].address, {"from": accounts[4]}) == 0
    assert CCOW.ownerOf(1, {"from": accounts[1]}) == accounts[4].address

    with revs("Cow Interrupted"):
        CCOW.reclaimNoTakers(1, {'from': accounts[1]})
        CCOW.reclaimNoTakers(1, {'from': accounts[0]})
        CCOW.reclaimNoTakers(1, {'from': accounts[4]})
    
    ### modifier timeElapsed(uint256)
    with revs("None Found"):
        CCOW.VestDeal(33, {'from': accounts[6]})

    with revs("Not Owner"):
        CCOW.LiquidateDeal(1, {'from': accounts[1]})

    with revs("Not Ready"):
        CCOW.LiquidateDeal(1, {'from': accounts[4]})


    chain.sleep(356 * 2 * 86400)
    chain.mine(1)

    with revs("None Found"):
        CCOW.VestDeal(33, {'from': accounts[6]})

    with revs("Not Owner"):
        CCOW.LiquidateDeal(1, {'from': accounts[1]})

    assert interface.IERC20(pool).balanceOf(accounts[4].address, {"from": accounts[4]}) == 0
    b0_beforeLiquidation = interface.IERC20(deal[0][2]).balanceOf(accounts[4].address, {"from": accounts[4]})
    b1_beforeLiquidation = DAI.balanceOf(accounts[4].address, {"from": accounts[4]})
    chain.mine(1)

    chain.snapshot()
    
    CCOW.LiquidateDeal(1, {'from': accounts[4]})
    assert interface.IERC20(pool).balanceOf(accounts[4].address ) >= ( deal[1][2] // 2)
    assert interface.IERC20(pool).balanceOf(accounts[0].address) >=  ( deal[1][2] // 2)

    chain.revert()

    sfToken = interface.ISuperToken(pool)
    assert sfToken.balanceOf(accounts[4].address) == 0
    
    b1 = DAI.balanceOf(CCOW.address, {"from": accounts[4]})
    b2 = VC.balanceOf(CCOW.address, {"from": accounts[4]})
    
    CCOW.VestDeal(1, {'from': accounts[4]})
    chain.sleep(3342 * 10)

    b3 = DAI.balanceOf(CCOW.address, {"from": accounts[4]})
    b4 = VC.balanceOf(CCOW.address, {"from": accounts[4]})
    




