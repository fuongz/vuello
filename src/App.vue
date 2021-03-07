<template>
  <div id="app">
    <UILoading />
    <router-view />
  </div>
</template>

<script>
import UILoading from './components/Loading.vue'

export default {
  components: {
    UILoading,
  },
}
</script>
