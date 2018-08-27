<template>
  <GmapMap
    :center="{lat:10, lng:10}"
    :zoom="6"
    map-type-id="terrain"
    style="width: 100%; height: 500px"
    >
  <GoogleMapMarker />
  </GmapMap>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import GoogleMapMarker from '@/components/GoogleMapMarker.vue'
 
export default {
  computed: {
    google: gmapApi
  },
  components: {
    GoogleMapMarker
  }
}
</script>

<style scoped lang="scss">
    .google-map {
        width: 100%;
        height: 800px;
        background: #ccc;
    }
</style>