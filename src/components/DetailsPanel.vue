<template>
  <div class="details-panel">
    <h1>Details About the thing</h1>
  </div>
</template>

<script>
export default {
  name: 'DetailsPanel',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .details-panel {
      position: absolute;
      width: 400px;
      top: 0px;
      right: 0px;
      height: 800px;
      background: #333;
      color: #fff;
    }
</style>
