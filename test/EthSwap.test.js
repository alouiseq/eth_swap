const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

const convertTokens = n => web3.utils.toWei(n, 'ether');

contract('EthSwap', ([deployer, investor]) => {
  let token, ethSwap ;
  const oneMil = '1000000';

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
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

  describe('buyTokens()', async () => {
    let result;

    before(async () => {
      result = await ethSwap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether') });
    })

    it('allows user to instantly purchase tokens at a fixed price from ethSwap', async () => {
      const investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), convertTokens('100'));

      const ethSwapTokenBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapTokenBalance.toString(), convertTokens('999900'));
      const ethSwapEthBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapEthBalance.toString(), convertTokens('1'));
    })
  })
})
