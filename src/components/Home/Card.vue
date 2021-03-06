<template>
  <router-link :to="{ path: `/b/${board.id}` }">
    <div class="bg-white relative shadow p-2 rounded text-gray-800 hover:shadow-lg">
      <img :src="picSum" class="h-32 rounded w-full object-cover" />
      <div class="py-2 px-2">
        <div class="font-semibold font-title text-gray-700">{{ board.name }}</div>
        <div class="text-sm font-normal text-gray-500 my-2">
          {{ board.description ? board.description : 'No description' }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      picSum: `https://picsum.photos/300/150?v=${this.board.id}`,
    };
  },
  props: ['board'],
};
</script>
