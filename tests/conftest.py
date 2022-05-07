
import pytest
from brownie import accounts, CashCow, chain, ZERO_ADDRESS, ValueConduct, interface 

DAI_ADDR = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" #polygon mainnet
V3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"


@pytest.fixture
def isPolygon():
    return chain.id == 137

@pytest.fixture
def CCOW():
    deployed1 = CashCow.deploy(DAI_ADDR, V3Factory, {'from': accounts[0]})
    return deployed1

@pytest.fixture
def VC():
    deployed2 = ValueConduct.deploy('0xe7b30a037f5598e4e73702ca66a59af5cc650dcd',{'from': accounts[0]})
    print("ValueConduct deplyed at: ", deployed2.address)
    return deployed2

@pytest.fixture
def DAI():
    D = interface.IERC20(DAI_ADDR)
    print("DAI wrapped. balance of accounts[0] - address: ", D.balanceOf(accounts[0]), D.address)
    return D

@pytest.fixture
def IV3Factory():
    factory = interface.IUniswapV3Factory(V3Factory)
    return factory


