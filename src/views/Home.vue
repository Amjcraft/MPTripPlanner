<template>
  <div class="home">
    <GoogleMap>
      
    </GoogleMap>
    
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
