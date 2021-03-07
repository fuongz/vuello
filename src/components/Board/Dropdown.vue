<template>
  <div>
    <on-click-outside :do="handleClickOutside">
      <div class="relative w-64 mx-auto">
        <button
          @click="open = !open"
          type="button"
          class="block bg-blue text-white font-semibold rounded text-right focus:outline-0"
        >
          Click to open
        </button>
        <div
          v-show="open"
          class="mt-px text-sm text-left text-gray-600 leading-normal rounded bg-white border p-2 absolute z-50"
        >
          <ul>
            <li
              @click="editBoard"
              class="rounded-sm px-3 py-1 cursor-pointer hover:bg-gray-100"
            >
              Edit
            </li>
            <li
              @click="closeBoard"
              class="rounded-sm text-red-600 px-3 py-1 cursor-pointer hover:bg-red-100"
            >
              Close board...
            </li>
          </ul>
        </div>
      </div>
    </on-click-outside>
    <confirm-delete-modal />
  </div>
</template>

<script>
import OnClickOutside from '../Plugins/OnClickOutSide.vue'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'

export default {
  name: 'DropdownDemo',
  components: {
    OnClickOutside,
    ConfirmDeleteModal,
  },
  props: ['board'],
  data() {
    return {
      open: false,
    }
  },
  methods: {
    handleClickOutside() {
      if (this.open) {
        this.open = false
      }
    },
    closeBoard() {
      this.$modal.show('confirm-delete-modal', { id: this.board.board.id })
    },
    editBoard() {},
  },
}
</script>
