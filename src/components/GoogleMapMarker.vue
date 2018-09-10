<template>
  <GmapMarker ref="myMarker"
    :position="google && googleMarker"
    :clickable="true"
    @click="onClick"/>
</template>
<script>
import {gmapApi} from 'vue2-google-maps'
 import Store from './../store.js'

export default {
  computed: {
    google: gmapApi,
    googleMarker: function () {
      return new this.google.maps.LatLng(this.markerDetails.route.lat, this.markerDetails.route.lng );
    }
  },
  methods: {
      onClick: () => {
        //console.log('marker Click,' + this.markerDetails)
        Store.openDeatilsPanel();
        //Create a Golabl store to trigger Details panel and load new Route into panel
      }
    },
  props: [
    'markerDetails'
  ]
}
</script>