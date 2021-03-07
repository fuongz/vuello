<template>
  <button class="button" :class="variantClass" type="submit" :disabled="isBusy">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'UIButton',

  props: {
    isBusy: {
      type: Boolean,
      default: false,
    },

    variant: {
      type: String,
      default: null,
    },
  },

  computed: {
    variantClass() {
      return this.variant ? `button--${this.variant}` : ''
    },
  },
}
</script>

<style lang="postcss" scoped>
.button {
  @apply font-semibold py-2 px-4 rounded block w-full;
}

.button--primary {
  @apply bg-blue-500 text-white;
}

.button--primary:hover,
.button--primary:focus {
  @apply bg-blue-700;
}
</style>
