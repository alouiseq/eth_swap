const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

const convertTokens = n => web3.utils.toWei(n, 'ether');

contract('EthSwap', (accounts) => {
  let token, ethSwap ;
  const oneMil = '1000000';

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new();
    await token.transfer(ethSwap.address, convertTokens(oneMil));
  })

  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name();
      assert.equal(name, 'DApp Token');
    })
  })

  describe('EthSwap deployment', async () => {
    it('contract has a name', async () => {
      const name = await ethSwap.name(); 
      assert.equal(name, 'EthSwap Instant Exchange');
    })

    it('contract has tokens', async () => {
      const balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), convertTokens(oneMil));
    })
  })
})
