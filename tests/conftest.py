
import pytest
from brownie import accounts, CashCow, chain, ZERO_ADDRESS, ValueConduct, interface 

DAI_ADDR = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" #polygon mainnet
V3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"


@pytest.fixture
def isPolygon():
    return chain._chainid == 137

@pytest.fixture
def CashCow():
    deployed1 = CashCow.deploy({'from': accounts[0]})
    return deployed1

@pytest.fixture
def ValueConduct():
    deployed2 = ValueConduct.deploy('0xe7b30a037f5598e4e73702ca66a59af5cc650dcd',{'from': accounts[0]})
    print("ValueConduct deplyed at: ", deployed2.address)
    return deployed2

@pytest.fixture
def DAI():
    DAI = interface.IERC20(DAI_ADDR)
    print("DAI wrapped. balance of accounts[0] - address: ", DAI.balanceOf(accounts[0]), DAI.address)
    return DAI

@pytest.fixture
def IV3Factory():
    factory = interface.IUniswapV3Factory(V3Factory)
    print("DAI wrapped. balance of accounts[0] - address: ", DAI.balanceOf(accounts[0]), DAI.address)
    return factory


