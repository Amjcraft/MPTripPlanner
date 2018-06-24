<template>
  <div class="google-map">
    <div class="google-map-container">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMap from '@/components/GoogleMap.vue'
import DetailsPanel from '@/components/DetailsPanel.vue'

export default {
  name: 'googleMap'
}
</script>

<style scoped lang="scss">
    .google-map {
        width: 100%;
        height: 800px;
        background: #ccc;
    }
</style>