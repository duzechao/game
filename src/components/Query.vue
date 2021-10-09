
<template>
  <div class="hello">
    <div>已收入:{{weiRaised}}USDT</div>
    <div>address:{{address}}</div>
    <div>rate:{{rate}}</div>
    <div>paymented:{{paymented}}</div>

  </div>
</template>

<script>
import CrowdsaleByTokenAbi from "../config/CrowdsaleByTokenAbi.json";
import * as ethers from "ethers";
import Web3Modal from "web3modal";
var provider;
var signer;
var contract;  
export default {
  name: 'Query',
  
  data () {
    return {
      address: '',
      rate:'',
      weiRaised:'',
      paymented:"",
      weiRaised:""
    }
  },
  methods:{
    query:async function(){
      if(contract==undefined){
          return;
      }
      let rate = await contract.getCurrentRate()
      let address = await signer.getAddress()
      let paymented = await contract.getPaymented(address)
      let weiRaised = await contract._weiRaised()
      this.$data.address = address
      this.$data.rate = rate
      this.$data.paymented = paymented/(10**18)
      this.$data.weiRaised = weiRaised/(10**18)
    },
    onComplete(data){
      console.log('data:', data);
    },
    initWallet:async function(){
      
      const providerOptions = {
        /* See Provider Options Section */
      };

      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });

      const web3provider = await web3Modal.connect();
      provider = new ethers.providers.Web3Provider(web3provider)
      signer = provider.getSigner()
      contract = new ethers.Contract("0x4aD8Be742D2C820ED783da8E20a381F65F105cEA", CrowdsaleByTokenAbi, signer)
      let that = this;
      contract.on("TokensPurchased", (purchaser, beneficiary, value, amount,paymented) => {
        console.log(`${ purchaser }  ${ beneficiary }  ${ value} ${amount}  ${paymented}`);
        that.query();
        });
      web3provider.on('accountsChanged', function (accounts) {
        that.query()
      })
      that.query()

    }
  },
  mounted(){
    let that = this;
    this.$nextTick(function () {
      
      that.initWallet()
      
  })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
