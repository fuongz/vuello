<template>
  <loading
    :active.sync="ui.loading.enable"
    color="#2A4365"
    loader="dots"
    :opacity="ui.loading.opacity"
    :is-full-page="fullPage"
  ></loading>
</template>

<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'LoadingUI',
  components: {
    Loading,
  },
  data() {
    return {
      fullPage: true,
      isLoading: false,
    }
  },
  computed: mapState(['ui']),
}
</script>
