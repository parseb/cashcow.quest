from brownie import CashCow, ValueConduct, accounts

#DAI_ADDR = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735" #polygon mainnet
# V3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"

DAI_mumbai = "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F"
sushiV2Router = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506" # polygon sushi router
sushiV2Factory = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4" # sushi factory


def main():
    acct = accounts.load('69')
    deployed_at = CashCow.deploy(DAI_mumbai, sushiV2Factory, sushiV2Router, "0xE7b30A037F5598E4e73702ca66A59Af5CC650Dcd", {'from': acct}, publish_source=True)
    print("CCOW deployed at: ", deployed_at.address)

    deployed2 = ValueConduct.deploy(acct.address ,{'from': acct}, publish_source=True)
    print("ValueConduct deplyed at: ", deployed2.address)

    writetofile = open("deployed_mumbai.txt", "w")
    writetofile.write("CashCow: " + str(deployed_at) + "\n" + "ValueConduct: " + str(deployed2))
    writetofile.close()
    
