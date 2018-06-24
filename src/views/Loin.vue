<template>
  <div class="login">
      <input v-model="MPKey" placeholder="Your Mountain Project API Key">
      <button v-on:click="submit">Submit<button/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: {
    MPKey: ""
  },
  props: {
    msg: String
  },
  methods: {
    submit: function (event) {
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
