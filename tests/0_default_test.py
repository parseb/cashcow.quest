import pytest
from brownie import accounts, chain, ZERO_ADDRESS, interface
from tests.conftest import CCOW, DAI, VC, IV3Factory, isPolygon



def test_default(isPolygon, CCOW, VC, DAI, IV3Factory):
    assert isPolygon
    assert CCOW.address != ZERO_ADDRESS
    assert interface.IERC20(VC.address).balanceOf(accounts[-2]) > 100_000
    assert interface.IERC20(DAI.address).balanceOf(accounts[-1]) > 100_000



