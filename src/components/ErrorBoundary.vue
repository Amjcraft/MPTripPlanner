<template>
    <p v-if="error">
       {{ message ? message : 'Opps, Somthing Went Wrong' }}
       {{ errorMessage ? message : '' }}

    </p>
</template>

<script>
export default {
  name: 'error-boundary',
  data: {
      error: false ,
      errorMessage: ""
  },
  methods: {
    errorCaptured (err, vm, info) {
        this.error = true
        this.errorMessage = err;
    },
  },
  props: {
    message: String
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