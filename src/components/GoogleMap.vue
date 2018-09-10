<template>
  <GmapMap
    :center="{lat:10, lng:10}"
    :zoom="6"
    map-type-id="terrain"
    style="width: 100%; height: 500px"
    >
  <GoogleMapMarker v-for="(item, index) in testLocations" v-bind:markerDetails="item" v-bind:key="index"/>
  </GmapMap>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import GoogleMapMarker from '@/components/GoogleMapMarker.vue'


// Filters: Show all trips of last updaed trip( for now last added trio)
// Each trip is a filter that loads routes on map, including favs



export default {
  computed: {
    google: gmapApi
  },
  data: () => {
    return {
      testLocations: [
        {
          route: {lat:10, lng:10},
          trip: {
            name: "Trip 1"
          }
        },
        {
          route: {lat:10.1, lng:10.2},
          trip: {
            name: "Trip 2"
          }
        },
        {
          route: {lat:10.2, lng:10.4},
          trip: {
            name: "Trip 3"
          }
        }
      ]
    }
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