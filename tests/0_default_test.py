import pytest
from brownie import accounts, chain, ZERO_ADDRESS, interface
from tests.conftest import CashCow, DAI, ValueConduct, IV3Factory, isPolygon



def test_default(isPolygon, CashCow, ValueConduct, DAI, IV3Factory):
    assert isPolygon
    assert CashCow.address != ZERO_ADDRESS
    



