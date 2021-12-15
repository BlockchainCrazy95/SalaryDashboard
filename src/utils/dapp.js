const axios = require("axios");
const Contract = require("web3-eth-contract");

const contractAbi = require("../contracts/contractAbi.json");
const distributorAbi = require("../contracts/distributorAbi.json");
const { provider, id, cakeId, currency, contractAddress, distributorAddress } = require("../config");

async function getPrice() {
    let result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`);
    return result.data[id][currency];
}

async function getCakeData() {
    let result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cakeId}&vs_currencies=${currency}&include_24hr_change=true`);
    return {
        price: result.data[cakeId][currency],
        priceChange: result.data[cakeId][`${currency}_24h_change`],
    };
}

/*
    Your Token Holding : Your balance
*/
async function getBalance(address) {
    Contract.setProvider(provider);

    let contract = new Contract(contractAbi, contractAddress);
    let decimals = await contract.methods.decimals().call();
    
    try {
        let result = await contract.methods.balanceOf(address).call();
        let balance = parseFloat(result) / Math.pow(10, decimals);
        return balance;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

/*
Your Rewards in Total
    address :  0x1Bbf42A19775aEC654bA83Cd220F1dC67c09e60d
    int256 :  1418
    int256 :  321
    uint256 :  988093149047136849    // pending rewards
    uint256 :  78212652905291700192  // earned total rewards
    uint256 :  1639142745
    uint256 :  1639142805
    uint256 :  0
*/
async function getYourRewards(address) {
    Contract.setProvider(provider)
    let contract = new Contract(contractAbi, contractAddress)
    let decimals = 18
    let info = await contract.methods.getAccountUSDTDividendsInfo(address).call();
    return info / Math.pow(10, decimals)
}

/*
    Total Rewards Paid Out : Total USDT Rewards paid to holders
*/
async function getTotalDistributed() {
    Contract.setProvider(provider);
    let contract = new Contract(distributorAbi, distributorAddress);
    let decimals = 18;

    let info = await contract.methods.totalDividendsDistributed().call();
    return info / Math.pow(10, decimals);
}

const getDashboardDataFromAddress = async (address) => {
    const price = await getPrice();

    const cakeData = await getCakeData();

    const holding = await getBalance(address);

    const myRewards = holding > 0 ? await getYourRewards(address) : null;
    let rewardPaid = 0, rewardPending = 0;
    if(myRewards) {
        rewardPending = myRewards[3];
        rewardPaid = myRewards[4];
    }
    let totalRewards = 0;
    const totalDistributed = holding > 0 ? await getTotalDistributed() : null;
    if( totalDistributed ) {
        totalRewards = totalDistributed * cakeData.price
    }
    
    return {
        holding,
        rewardPaid,
        rewardPending,
        totalRewards
    };
}

export default getDashboardDataFromAddress