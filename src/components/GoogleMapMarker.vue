<template>
  <GmapMarker ref="myMarker"
    :position="google && new google.maps.LatLng(10, 10)" />
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
 
export default {
  computed: {
    google: gmapApi
  }
}
</script>