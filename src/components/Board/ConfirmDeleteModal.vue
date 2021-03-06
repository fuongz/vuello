<template>
  <modal
    name="confirm-delete-modal"
    transition="pop-out"
    :width="500"
    height="auto"
    @before-open="beforeOpen"
  >
    <div class="bg-white rounded-lg">
      <div class="flex flex-col items-start p-4">
        <div class="flex items-center w-full">
          <div class="text-gray-900 font-medium">
            Are you sure you want to delete this board?
          </div>
        </div>
        <div class="ml-auto mt-4">
          <button
            @click="closeBoard"
            class="bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Agree
          </button>
          <button
            @click="$modal.hide('confirm-delete-modal')"
            class="text-gray-800
            font-semibold py-2 px-4 border bg-gray-300
            rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { close } from '../../api/board';

export default {
  data() {
    return {
      boardId: 0,
    };
  },
  methods: {
    beforeOpen(event) {
      this.boardId = event.params.id;
    },
    async closeBoard() {
      await close(this.boardId);
      return this.$router.push('/');
    },
  },
};
</script>
