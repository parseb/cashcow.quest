
import pytest
from brownie import accounts, CashCow, chain, ZERO_ADDRESS, ValueConduct, interface 

DAI_ADDR = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" #polygon mainnet
# V3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"

sushiV2Router = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" #polygon sushi router
sushiV2Factory = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" # sushi factory

V3Factory = sushiV2Factory
sweeper = "0xe7b30a037f5598e4e73702ca66a59af5cc650dcd"

polygon_superfluidHost = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7"
polygon_supertokenfactory = "0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34"


arbitrum_superfluidhost = "0xCf8Acb4eF033efF16E8080aed4c7D5B9285D2192"
arbitrum_supertokenfactory = "0x1C21Ead77fd45C84a4c916Db7A6635D0C6FF09D6"

@pytest.fixture
def isPolygon():
    return chain.id == 137

@pytest.fixture
def CCOW():
    deployed1 = CashCow.deploy(DAI_ADDR, V3Factory, sushiV2Router, sweeper, {'from': accounts[0]})
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
    factory = interface.IUniswapV2Factory(V3Factory)
    return factory
    
@pytest.fixture
def V2Router():
    v2 = interface.IUniswapV2Router01(sushiV2Router)
    return v2