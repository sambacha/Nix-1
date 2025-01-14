const { ZERO_ADDRESS, BUYORSELL, ANYORALL, BUYORSELLSTRING, ANYORALLSTRING, Data } = require('./helpers/common');
const { singletons, expectRevert } = require("@openzeppelin/test-helpers");
const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const util = require('util');

let data;

describe("Nix", function () {
  const DETAILS = 0;

  beforeEach(async function () {
    const TestERC20 = await ethers.getContractFactory("TestERC20");
    const MockRoyaltyEngineV1 = await ethers.getContractFactory("MockRoyaltyEngineV1");
    const ERC721PresetMinterPauserAutoId  = await ethers.getContractFactory("ERC721PresetMinterPauserAutoId");
    const Nix = await ethers.getContractFactory("Nix");
    const NixHelper = await ethers.getContractFactory("NixHelper");
    data = new Data();
    await data.init();

    console.log("        --- Setup Accounts, WETH, NFT and Nix Contracts ---");
    erc1820Registry = await singletons.ERC1820Registry(data.deployer);
    await data.addAccount(erc1820Registry.address, "ERC1820Registry");

    const fixedSupply = ethers.utils.parseEther("500");
    const weth = await TestERC20.deploy("WETH", "Wrapped ETH", 18, fixedSupply);
    await weth.deployed();
    await data.setWeth(weth);

    const royaltyEngine = await MockRoyaltyEngineV1.deploy(data.royalty1, data.royalty2);
    await royaltyEngine.deployed();
    await data.setRoyaltyEngine(royaltyEngine);

    const nftA = await ERC721PresetMinterPauserAutoId.deploy("NFTeeA", "NFTA", "uri");
    await data.setNFTA(nftA);
    const nftATransactionReceipt = await data.nftA.deployTransaction.wait();
    if (DETAILS > 0) {
      await data.printEvents("Deployed NFTA", nftATransactionReceipt);
    }
    const nftB = await ERC721PresetMinterPauserAutoId.deploy("NFTeeB", "NFTB", "uri");
    await data.setNFTB(nftB);
    const nftBTransactionReceipt = await data.nftB.deployTransaction.wait();
    if (DETAILS > 0) {
      await data.printEvents("Deployed NFTB", nftBTransactionReceipt);
    }
    const nix = await Nix.deploy(weth.address, royaltyEngine.address);
    // console.log(nix);
    await nix.deployed();
    await data.setNix(nix);
    const nixTransactionReceipt = await data.nix.deployTransaction.wait();
    if (DETAILS >= 0) {
      await data.printEvents("Deployed Nix", nixTransactionReceipt);
    }

    const nixHelper = await NixHelper.deploy(nix.address);
    // console.log(nixHelper);
    await nixHelper.deployed();
    await data.setNixHelper(nixHelper);
    const nixHelperTransactionReceipt = await data.nixHelper.deployTransaction.wait();
    if (DETAILS >= 0) {
      await data.printEvents("Deployed NixHelper", nixHelperTransactionReceipt);
    }

    const setup1 = [];
    setup1.push(weth.transfer(data.maker0, ethers.utils.parseEther("100")));
    setup1.push(weth.transfer(data.maker1, ethers.utils.parseEther("100")));
    setup1.push(weth.transfer(data.taker0, ethers.utils.parseEther("100")));
    setup1.push(weth.transfer(data.taker1, ethers.utils.parseEther("100")));
    const [transferWeth0Tx, transferWeth1Tx, transferWeth2Tx, transferWeth3Tx] = await Promise.all(setup1);
    if (DETAILS > 0) {
      [transferWeth0Tx, transferWeth1Tx, transferWeth2Tx, transferWeth3Tx].forEach( async function (a) {
        await data.printEvents("Transfer WETH", await a.wait());
      });
    }

    const setup2 = [];
    setup2.push(data.nftA.mint(data.maker0));
    setup2.push(data.nftA.mint(data.maker0));
    setup2.push(data.nftA.mint(data.maker0));
    setup2.push(data.nftA.mint(data.taker0));
    setup2.push(data.nftA.mint(data.taker0));
    setup2.push(data.nftA.mint(data.taker0));
    const mintATxs = await Promise.all(setup2);
    if (DETAILS > 0) {
      mintATxs.forEach( async function (a) {
        await data.printEvents("Minted NFTA", await a.wait());
      });
    }

    const setup3 = [];
    setup3.push(data.nftB.mint(data.maker0));
    setup3.push(data.nftB.mint(data.maker0));
    setup3.push(data.nftB.mint(data.maker0));
    setup3.push(data.nftB.mint(data.taker0));
    setup3.push(data.nftB.mint(data.taker0));
    setup3.push(data.nftB.mint(data.taker0));
    const mintBTxs = await Promise.all(setup3);
    if (DETAILS > 0) {
      mintBTxs.forEach( async function (a) {
        await data.printEvents("Minted NFTB", await a.wait());
      });
    }

    const setup4 = [];
    setup4.push(weth.connect(data.deployerSigner).approve(nix.address, ethers.utils.parseEther("100")));
    setup4.push(weth.connect(data.maker0Signer).approve(nix.address, ethers.utils.parseEther("100")));
    setup4.push(weth.connect(data.maker1Signer).approve(nix.address, ethers.utils.parseEther("100")));
    setup4.push(weth.connect(data.taker0Signer).approve(nix.address, ethers.utils.parseEther("100")));
    setup4.push(weth.connect(data.taker1Signer).approve(nix.address, ethers.utils.parseEther("100")));
    const [wethApproveNix0Tx, wethApproveNix1Tx, wethApproveNix2Tx, wethApproveNix3Tx, wethApproveNix4Tx] = await Promise.all(setup4);
    if (DETAILS > 0) {
      [wethApproveNix0Tx, wethApproveNix1Tx, wethApproveNix2Tx, wethApproveNix3Tx, wethApproveNix4Tx].forEach( async function (a) {
        await data.printEvents("WETH.approve(nix)", await a.wait());
      });
    }

    const setup5 = [];
    setup5.push(data.nftA.connect(data.maker0Signer).setApprovalForAll(nix.address, true));
    setup5.push(data.nftA.connect(data.maker1Signer).setApprovalForAll(nix.address, true));
    setup5.push(data.nftA.connect(data.taker0Signer).setApprovalForAll(nix.address, true));
    setup5.push(data.nftA.connect(data.taker1Signer).setApprovalForAll(nix.address, true));
    const [approve0Tx, approve1Tx, approve2Tx, approve3Tx] = await Promise.all(setup5);
    if (DETAILS > 0) {
      [approve0Tx, approve1Tx, approve2Tx, approve3Tx].forEach( async function (a) {
        await data.printEvents("NFTA.approved(nix)", await a.wait());
      });
    }
    // console.log("bytecode ~" + JSON.stringify(nix.deployTransaction.data.length/2, null, 2));
    await data.printState("Setup Completed. Nix bytecode ~" + nix.deployTransaction.data.length/2 + ", NixHelper bytecode ~" + nixHelper.deployTransaction.data.length/2);
  })

  it("00. Maker BuyAny Test", async function () {
    console.log("      00. Maker BuyAny Test");
    console.log("        --- Maker Add Orders ---");
    const addOrder1Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #0 - BuyAny Max 5 NFTA:{3|4|5} for 11e", await addOrder1Tx.wait());
    const expiry2 = parseInt(new Date() / 1000) + (60 * 60 * 24);
    const addOrder2Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ ], ethers.utils.parseEther("0.0011"), expiry2, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #1 - BuyAny Max 5 NFTA:* for 0.0011e", await addOrder2Tx.wait());
    const addOrder3Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftB.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("22"), 0, 50, 75, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #0 - BuyAny Max 50 NFTB:{3|4|5} for 22e", await addOrder3Tx.wait());
    await data.printState("After Maker Added Orders");
    console.log("        --- Taker Execute Orders ---");
    const executeOrder1Tx = await data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address, data.nftA.address], [0, 1], [[ 3, 5 ], [4]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Taker Execute Orders" , await executeOrder1Tx.wait());
    await data.printState("After Taker Executed Orders");

    console.log("        --- Owner Withdraw Tips ---");
    const ownerWithdrawTips0Tx = await data.nix.connect(data.deployerSigner).withdraw(ZERO_ADDRESS, 0, 0);
    await data.printEvents("Owner Withdrawn Tips" , await ownerWithdrawTips0Tx.wait());
    await data.printState("After Owner Withdrawn Tips");
  });

  it("01. Maker BuyAll Test", async function () {
    console.log("      01. Maker BuyAll Test");
    console.log("        --- Maker Add Orders ---");
    const addOrder1Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 1, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #0 - BuyAll Max 1 NFTA:{3,4,5} for 11e", await addOrder1Tx.wait());
    await data.printState("After Maker Added Orders");
    console.log("        --- Taker Execute Orders ---");
    const executeOrder1Tx = await data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[ 3, 4, 5 ]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Taker Execute Orders", await executeOrder1Tx.wait());
    await data.printState("After Taker Executed Orders");
  });

  it("02. Maker SellAny Test", async function () {
    console.log("      02. Maker SellAny Test");
    console.log("        --- Maker Add Orders ---");
    const addOrder1Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.SELL, ANYORALL.ANY, [ 0, 1, 2 ], ethers.utils.parseEther("12.3456"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000000001") });
    await data.printEvents("Maker Added Order #0 - SellAny Max 5 NFTA:{0|1|2} for 12.3456e", await addOrder1Tx.wait());
    await data.printState("After Maker Added Orders");
    console.log("        --- Taker Execute Against Orders ---");
    const executeOrder1Tx = await data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[ 1, 2 ]], ethers.utils.parseEther("-24.6912"), 100, data.integrator, { value: ethers.utils.parseEther("0.000000001") });
    await data.printEvents("Taker Execute Orders", await executeOrder1Tx.wait());
    await data.printState("After Taker Executed Orders");
  });

  it("03. Maker SellAll Test", async function () {
    console.log("      03. Maker SellAll Test");
    console.log("        --- Maker Add Orders ---");
    const addOrder1Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.SELL, ANYORALL.ALL, [ 0, 1, 2 ], ethers.utils.parseEther("12.3456"), 0, 1, 100, data.integrator, { value: ethers.utils.parseEther("0.000000001") });
    await data.printEvents("Maker Added Order #0 - SellAll Max 1 NFTA:{0,1,2} for 12.3456e", await addOrder1Tx.wait());
    await data.printState("After Maker Added Orders");
    console.log("        --- Taker Execute Against Orders ---");
    const executeOrder1Tx = await data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[ 0, 1, 2 ]], ethers.utils.parseEther("-12.3456"), 100, data.integrator, { value: ethers.utils.parseEther("0.000000001") });
    await data.printEvents("Taker Execute Orders", await executeOrder1Tx.wait());
    await data.printState("After Taker Executed Orders");
  });

  it("10. Test Add And Execute Order Exceptions", async function () {
    console.log("      10. Test Add And Execute Order Exceptions");

    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 3 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSortedWithNoDuplicates()");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 4, 3 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSortedWithNoDuplicates()");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 5, 4 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSortedWithNoDuplicates()");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSpecifiedForBuyOrSellAll()");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TradeMaxMustBeZeroOrOneForBuyOrSellAll()");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 1, 10000, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("RoyaltyOverMax(10000, 1000)");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.maker0Signer.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 1, 1000, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("function returned an unexpected amount of data");
    await expect(data.nix.connect(data.maker0Signer).addOrder(data.nix.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 1, 1000, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("NotERC165()");

    console.log("        --- Maker Add Orders ---");
    // No Expiry
    const addOrder0Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5, 6 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #0 - No Expiry - BuyAny Max 5 NFTA:{3|4|5|6} for 11e", await addOrder0Tx.wait());
    // Disabled
    const addOrder1Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 1, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #1 - Disabled - BuyAny Max 5 NFTA:{3|4|5} for 11e", await addOrder1Tx.wait());
    // Expired
    const expiry2 = parseInt(new Date() / 1000) - (60 * 60 * 24);
    const addOrder2Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("11"), expiry2, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #2 - Expired - BuyAny Max 5 NFTA:{3|4|5} for 11e", await addOrder2Tx.wait());
    // UnExpired
    const expiry3 = parseInt(new Date() / 1000) + (60 * 60 * 24);
    const addOrder3Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("11"), expiry3, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #3 - Un Expired - BuyAny Max 5 NFTA:{3|4|5} for 11e", await addOrder3Tx.wait());
    // Un Expired for taker1
    const expiry4 = parseInt(new Date() / 1000) + (60 * 60 * 24);
    const addOrder4Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, data.taker1Signer.address, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("11"), expiry4, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #4 - Un Expired - BuyAny Max 5 NFTA:{3|4|5} for 11e", await addOrder4Tx.wait());
    // All, No Expiry
    const addOrder5Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 1, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #5 - No Expiry - BuyAll Max 1 NFTA:{3,4,5} for 11e", await addOrder5Tx.wait());
    // All, UnExpired, Maxxed
    const addOrder6Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), expiry3, 0, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #5 - No Expiry - BuyAll Max 0 NFTA:{3,4,5} for 11e", await addOrder6Tx.wait());

    await data.printState("After Maker Added Orders");

    console.log("        --- Taker Execute Orders ---");
    await expect(data.nix.connect(data.maker0Signer).executeOrders([data.nftA.address, data.nftA.address], [0, 1], [[ 3, 5 ], [4]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("CannotExecuteOwnOrder()");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address, data.nftA.address], [1], [[4]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("InputArraysMismatch");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [1, 2], [[4]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("InputArraysMismatch");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [1], [[4], [3]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("InputArraysMismatch");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [1], [[4]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("OrderExpired(1, 1)");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [2], [[4]], ethers.utils.parseEther("22.0011").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("OrderExpired(2");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsNotSpecified");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsNotSpecified");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [4], [[4]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("OrderCanOnlyBeExecutedBySpecifiedTaker(4,");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[6]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("ERC721: operator query for nonexistent token");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [0], [[7]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdNotFound(0, 7)");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [5], [[3, 4]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMismatch(5, [3, 4, 5], [3, 4])");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [5], [[3, 4, 5, 6]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMismatch(5, [3, 4, 5], [3, 4, 5, 6])");
    await expect(data.nix.connect(data.taker0Signer).executeOrders([data.nftA.address], [6], [[3, 4, 5]], ethers.utils.parseEther("11").mul(7).div(10), 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("OrderMaxxed(6, 1, 0)");
  });

  it("20. Test Update Order Exceptions", async function () {
    console.log("      20. Test Update Order Exceptions");

    console.log("        --- Maker Add Orders ---");
    // No Expiry
    const addOrder0Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ANY, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 5, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #0 - No Expiry - BuyAny Max 5 NFTA:{3|4|5} for 11e", await addOrder0Tx.wait());
    // All, No Expiry
    const addOrder5Tx = await data.nix.connect(data.maker0Signer).addOrder(data.nftA.address, ZERO_ADDRESS, BUYORSELL.BUY, ANYORALL.ALL, [ 3, 4, 5 ], ethers.utils.parseEther("11"), 0, 1, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Added Order #5 - No Expiry - BuyAll Max 1 NFTA:{3,4,5} for 11e", await addOrder5Tx.wait());

    await data.printState("After Maker Added Orders");

    console.log("        --- Update Order Price And Expiry ---");
    await expect(data.nix.connect(data.maker1Signer).updateOrderPriceAndExpiry(data.nftA.address, 0, ethers.utils.parseEther("11"), 0, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("NotMaker()");

    const updateOrderPriceAndExpiry0Tx = await data.nix.connect(data.maker0Signer).updateOrderPriceAndExpiry(data.nftA.address, 0, ethers.utils.parseEther("22"), 1, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Update Order Price And Expiry", await updateOrderPriceAndExpiry0Tx.wait());

    await data.printState("After Maker Update Order Price And Expiry");

    const expiry3 = parseInt(new Date() / 1000) + (60 * 60 * 24);
    await expect(data.nix.connect(data.maker1Signer).updateOrder(data.nftA.address, 0, ZERO_ADDRESS, [], ethers.utils.parseEther("33"), expiry3, 0, 200, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("NotMaker()");
    await expect(data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 0, ZERO_ADDRESS, [], ethers.utils.parseEther("33"), expiry3, 0, 2000, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("RoyaltyOverMax(2000, 1000)");
    await expect(data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 0, ZERO_ADDRESS, [ 4, 3 ], ethers.utils.parseEther("33"), expiry3, 0, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSortedWithNoDuplicates");
    await expect(data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 0, ZERO_ADDRESS, [ 3, 4, 4 ], ethers.utils.parseEther("33"), expiry3, 0, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSortedWithNoDuplicates");
    await expect(data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 0, ZERO_ADDRESS, [ 3, 5, 4 ], ethers.utils.parseEther("33"), expiry3, 0, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSortedWithNoDuplicates");
    await expect(data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 1, ZERO_ADDRESS, [], ethers.utils.parseEther("33"), expiry3, 0, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TokenIdsMustBeSpecifiedForBuyOrSellAll");
    await expect(data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 1, ZERO_ADDRESS, [ 2, 3 ], ethers.utils.parseEther("33"), expiry3, 1, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") })).to.be.revertedWith("TradeMaxMustBeZeroOrOneForBuyOrSellAll");

    const updateOrder0Tx = await data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 0, ZERO_ADDRESS, [], ethers.utils.parseEther("33"), expiry3, -3, 100, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Update Order Price And Expiry", await updateOrder0Tx.wait());
    const updateOrder1Tx = await data.nix.connect(data.maker0Signer).updateOrder(data.nftA.address, 1, data.taker0Signer.address, [ 3, 4 ], ethers.utils.parseEther("44"), expiry3, 0, 200, data.integrator, { value: ethers.utils.parseEther("0.000001") });
    await data.printEvents("Maker Update Order Price And Expiry", await updateOrder1Tx.wait());

    await data.printState("After Maker Update Order");
  });

  it("99. Admin Test", async function () {
    console.log("      99. Admin Test");
    console.log("        --- Send Nix ETH, WETH & NFT Tips ---");
    const sendNixTip0Tx = await data.deployerSigner.sendTransaction({ to: data.nix.address, value: ethers.utils.parseEther("0.888") });
    await data.printEvents("Send Nix ETH Tip" , await sendNixTip0Tx.wait());
    const sendNixWETHTip0Tx = await data.weth.connect(data.taker0Signer).transfer(data.nix.address, ethers.utils.parseEther("3.33"));
    await data.printEvents("Send Nix WETH Tip" , await sendNixWETHTip0Tx.wait());
    const takerTransferNFTToNixTx = await data.nftA.connect(data.taker0Signer)["safeTransferFrom(address,address,uint256)"](data.taker0, data.nix.address, 3);
    await data.printEvents("Taker0 Transfer NFTA To Nix For Donation" , await takerTransferNFTToNixTx.wait());
    await data.printState("After Send Nix ETH, WETH & NFT Tips");

    console.log("        --- Non-Owner Withdraw ETH, WETH & NFT Tips ---");
    await expect(data.nix.connect(data.taker0Signer).withdraw(ZERO_ADDRESS, 0, 0)).to.be.revertedWith("NotOwner()");
    await expect(data.nix.connect(data.taker0Signer).withdraw(data.weth.address, 0, 0)).to.be.revertedWith("NotOwner()");
    await expect(data.nix.connect(data.taker0Signer).withdraw(data.nftA.address, 0, 0)).to.be.revertedWith("NotOwner()");

    console.log("        --- Owner Withdraw ETH, WETH & NFT Tips ---");
    const ownerWithdrawETHTips0Tx = await data.nix.connect(data.deployerSigner).withdraw(ZERO_ADDRESS, 0, 0);
    await data.printEvents("Owner Withdrawn ETH Tips" , await ownerWithdrawETHTips0Tx.wait());
    const ownerWithdrawWETHTips0Tx = await data.nix.connect(data.deployerSigner).withdraw(data.weth.address, 0, 0);
    await data.printEvents("Owner Withdrawn WETH Tips" , await ownerWithdrawWETHTips0Tx.wait());
    const ownerWithdrawNFTTips0Tx = await data.nix.connect(data.deployerSigner).withdraw(data.nftA.address, 0, 3);
    await data.printEvents("Owner Withdrawn Tips" , await ownerWithdrawNFTTips0Tx.wait());
    await data.printState("After Owner Withdrawn ETH, WETH & NFT Tips");

    console.log("        --- Non-Owner Transfer Ownership ---");
    await expect(data.nix.connect(data.taker0Signer).transferOwnership(ZERO_ADDRESS)).to.be.revertedWith("NotOwner()");
    const ownerTransferOwnershipTx = await data.nix.connect(data.deployerSigner).transferOwnership(data.taker0Signer.address);
    await data.printEvents("Transfer Ownership" , await ownerTransferOwnershipTx.wait());
    expect(await data.nix.owner()).to.equal(data.taker0Signer.address);
  });

});
