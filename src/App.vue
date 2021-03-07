<template>
  <div id="app">
    <ui-loading />
    <router-view />
  </div>
</template>

<script>
import UiLoading from './components/Loading.vue'

export default {
  components: {
    UiLoading,
  },
}
</script>
