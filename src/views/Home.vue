<template>
  <div class="home">
    <GoogleMap>
      
    </GoogleMap>
    <DetailsPanel></DetailsPanel>
  </div>
</template>


<script>
// Nav bar to add /edit/ untrack trip
  // Trip includes Name, User list, Date? (All for now).
  
// filter bar of assocaited trips


// @ is an alias to /src
import GoogleMap from '@/components/GoogleMap.vue'
import DetailsPanel from '@/components/DetailsPanel.vue'
import Store from './../store.js'

export default {
  name: 'home',
  components: {
    GoogleMap,
    DetailsPanel
  },
  data: () => {
    return {
      MPEmail: "",
      MPKey: "",
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
