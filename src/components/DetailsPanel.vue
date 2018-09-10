<template>
  <div v-bind:class="{ active: detailsPanel.active, 'details-panel': true}">
    <h1>Details About the thing</h1>
  </div>
</template>

<script>
import Store from './../store.js'
import API from './../api.js'
export default {
  data: () => {
    return {
      detailsPanel: Store.state.detailsPanel,
      routeDetails: Store.state.activeRoute,
      beforeUpdate() {
        
      },
    }
  },
  name: 'DetailsPanel',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .details-panel {
      display: none;
      position: absolute;
      width: 400px;
      top: 0px;
      right: 0px;
      height: 800px;
      background: #333;
      color: #fff;
    }

    .details-panel.active {
      display: block;
    }
</style>
