from brownie import CashCow, ValueConduct, accounts, interface
from dbus import Interface

#DAI_ADDR = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735" #polygon mainnet
# V3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"

DAI_polygon = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
sushiV2Router = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" # polygon sushi router
sushiV2Factory = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" # sushi factory


def main():
    acct = accounts[0]
    deployed_at = CashCow.deploy(DAI_polygon, sushiV2Factory, sushiV2Router, "0xE7b30A037F5598E4e73702ca66A59Af5CC650Dcd", {'from': acct})
    print("CCOW deployed at: ", deployed_at.address)

    deployed2 = ValueConduct.deploy(acct.address ,{'from': acct})
    print("ValueConduct deplyed at: ", deployed2.address)

    writetofile = open("deployed_fork_local.txt", "w")
    writetofile.write("CashCow: " + str(deployed_at) + "\n" + "ValueConduct: " + str(deployed2))
    writetofile.close()
    
    accounts[0].transfer("0xb3F204a5F3dabef6bE51015fD57E307080Db6498", 5*10**18)
    accounts[0].transfer("0x7Dd1CFBed7723DfE959EE776b18C5E1490993297", 5*10**18)
    interface.IERC20(DAI_polygon).transfer("0xb3F204a5F3dabef6bE51015fD57E307080Db6498", 5000*10**18, {'from': accounts[-1]})
    interface.IERC20(deployed2.address).transfer("0x7Dd1CFBed7723DfE959EE776b18C5E1490993297", 5000*10**18, {'from': accounts[0]})
    interface.IERC20(DAI_polygon).approve(deployed_at.address, 5000*10**18, {'from': accounts[-3]})
    interface.IERC20(DAI_polygon).approve(deployed_at.address, 5000*10**18, {'from': accounts[-4]})
    interface.IERC20(deployed2.address).approve(deployed_at.address, 5000*10**18, {'from': accounts[-3]})
    interface.IERC20(deployed2.address).approve(deployed_at.address, 5000*10**18, {'from': accounts[-4]})

