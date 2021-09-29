
<template>
  <div class="hello">
    <a-input v-model="privateKey" placeholder="wallet key" />
    <a-button type="primary" @click="query">query</a-button>
    <div>address:{{address}}</div>
    <div>balance:{{coinBalance}}</div>

  </div>
</template>

<script>
import {balance, getAbi, loadWallet} from '../utils/walletUtil'
export default {
  name: 'Query',
  data () {
    return {
      address: '',
      privateKey:'',
      coinBalance:''
    }
  },
  methods:{
    query:async function(){
      let wallet = loadWallet(this.$data.privateKey)
      let b = await balance(wallet)
      this.$data.address = wallet.address
      this.$data.coinBalance = b
    }
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
