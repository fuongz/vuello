<template>
  <div class="flex m-4 justify-between">
    <div class="flex">
      <h3 class="text-white mr-4">{{ board.board.name }}</h3>
    </div>
    <div
      class="text-white font-sm text-underlined hidden md:flex items-center underline"
    >
      <Dropdown :board="board" />
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue'

export default {
  name: 'BoardHeader',
  components: {
    Dropdown,
  },
  props: ['board'],
}
</script>
