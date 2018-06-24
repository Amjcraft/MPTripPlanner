<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMap from '@/components/GoogleMap.vue'
import DetailsPanel from '@/components/DetailsPanel.vue'

export default {
  name: 'home',
  components: {
    GoogleMap,
    DetailsPanel
  }
}
</script>
