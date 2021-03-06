<template>
    <div class="draggable-item">
      <div class="Task">
        {{ task.name }}
      </div>
    </div>
</template>

<script>
export default {
  props: ['task'],
};
</script>

<style lang="scss">
.Task {
  @apply text-gray-700 bg-white p-2 rounded mt-1 border-b shadow border-gray-400 cursor-pointer;

  &:hover {
    @apply bg-gray-300;
  }
}
</style>
