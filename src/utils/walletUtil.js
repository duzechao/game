import { providers, utils, Contract, Wallet } from "ethers";
import defaultAbi from "../config/defaultAbi.json";
const url = "https://matic-mainnet.chainstacklabs.com";
const provider = new providers.JsonRpcProvider(url);

function getAbi(){
    return defaultAbi;
}

async function balance(wallet) {
    let balance = await wallet.getBalance()
    return utils.formatEther(balance);
}
async function balanceOf(wallet, contractAddress) {
    let abi = defaultAbi
    let contract = new Contract(contractAddress, abi, wallet)
    let data = await contract.balanceOf(wallet.address)
    let decimals = await contract.decimals()
    // let b = ethers.utils.parseUnits(data.toString(), decimals).toString()
    // console.log(decimals);
    // console.log(b);
    return utils.formatUnits(data, decimals)

}
function loadWallet(privateKey) {
    let wallet = new Wallet(privateKey, provider)

    console.log(wallet.address);
    return wallet
}
async function transfer(wallet, address, contractAddress, amount) {
    let abi = loadDefaultAbi()
    let contract = new Contract(contractAddress, abi, wallet)
    // let data = await contract.balanceOf(wallet.address)
    let decimals = await contract.decimals()
    let value = utils.parseUnits(amount, decimals)
    // let value = ethers.utils.parseEther(amount + "");
    //获取转账的gas
    // let gas = await contract.estimateGas.transfer(address, value)

    let data = await contract.transfer(address, value);
    console.log(data);
    // console.log(gg);

}

async function transferMain(wallet, address, amount) {
    let value = utils.parseEther(amount + "");


    // let gasLimit = 21000;
    // let gas = gasPrice.mul(gasLimit);
    // gas = utils.formatEther(gas.toString());
    // let gasPrice = await provider.getGasPrice();
    let tx = {
        to: address,
        value: value
    };
    let data = await wallet.sendTransaction(tx);
    console.log(data);

}

function loadDefaultAbi() {
    let rawdata = fs.readFileSync("defaultAbi.json");
    return JSON.parse(rawdata);
}
// balanceOf(wallet, "0xc2132d05d31c914a87c6611c10748aeb04b58e8f")
// console.log(ethers.utils.parseUnits("0.5", 6).toString());
// balance(wallet)
async function run() {
    // let wallet = loadWallet("walletPrivate")
    //获取主链代币的余额
    // let balanceMain = await balance(wallet)

    //转账主链代币
    // await transferMain(wallet, "0x75fF3d96b7422422CFdDCf09d1DC5f1201303260", "0.1")


    //转账合约代币
    // await transfer(wallet,
    //     "0x3Ad7B06DD10e8C77c5cD9fb321f5157378c84459",
    //     "0x6cA4CD8873db45596C915268FC737994933D8a27",
    //     "100")
    loadWallets()
}

export{
    getAbi,loadWallet,balance
}