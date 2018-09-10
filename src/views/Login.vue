<template>
  <div class="login">
      <input v-model="MPEmail" placeholder="Your Mountain Project Email"/>
      <input v-model="MPKey" placeholder="Your Mountain Project API Key"/>
      <button v-on:click="submit">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'



export default {
  name: 'Login',
  data: () => {
    return {
      MPEmail: "",
      MPKey: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    submit: function (event) {
      const self = this;
      if(this.MPEmail && this.MPKey){
        API.login({email: this.MPEmail, key: this.MPKey}).then(function(){
          self.$router.push({ path: '/' })
        });
      }
      console.log('Submit');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login{
    width:400px;
    padding: 20px;
    margin:60px auto;
    border: 1px solid #333;
  }
</style>
