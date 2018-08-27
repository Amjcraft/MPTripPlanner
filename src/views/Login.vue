<template>
  <div class="login">
      <input v-model="MPEmail" placeholder="Your Mountain Project Email"/>
      <input v-model="MPKey" placeholder="Your Mountain Project API Key"/>
      <button v-on:click="submit">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'

const API = {
    login: function (user) {
        if (!user.email || !user.key) {
            return new error('User info incorrect')
        }
        const loginRequest = axios.create({
          timeout: 10000,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
          proxy: {
            host: '127.0.0.1',
            port: 8000
          },
        });
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;
        // axios.defaults.headers.
        const postData = {
            email: user.email,
            key: user.key
        };

        return axios.post('http://localhost:8000/api/user/login', postData)
        .then(function (response) {
            console.log('User Login Yeah!!');
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
};

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
