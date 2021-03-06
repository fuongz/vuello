<template>
  <on-click-outside :do="handleClick">
    <div class="relative w-64 mx-auto">
      <button
        @click="open = !open"
        type="button"
        class="block bg-blue text-white font-semibold rounded text-right focus:outline-0"
      >{{ title }}</button>
      <div v-show="open" class="Dropdown-menu">
        <ul v-for="action in actions" :key="action.label">
          <li @click="action.handle" :class="action.class">{{ action.label }}</li>
        </ul>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import OnClickOutside from './Plugins/OnClickOutSide.vue';

export default {
  data() {
    return {
      open: false,
    };
  },
  props: ['title', 'actions'],
  components: {
    OnClickOutside,
  },
  methods: {
    handleClickOutside() {
      if (this.open) {
        this.open = false;
      }
    },
  },
};
</script>
