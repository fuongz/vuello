<template>
  <div class="home bg-gray-200 min-h-screen">
    <Header />
    <CreateBoardModal />

    <div class="container mx-auto mt-4 app-container">
      <div class="grid grid-cols-4 gap-4">
        <button
          @click="
            $modal.show('modal-create-board', {
              boardId: board.board.id,
            })
          "
          class="bg-white hover:bg-gray-100 text-gray-600 rounded shadow-sm p-8"
        >
          Create new board
        </button>

        <div v-for="board in board.boards" :key="board.id">
          <BoardCard :board="board" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMe } from '../api/user'
import { getBoards } from '../api/board'

import Header from '../components/layout/Header.vue'
import BoardCard from '../components/Home/Card.vue'
import CreateBoardModal from '../components/Modals/CreateBoardModal.vue'

export default {
  name: 'Home',

  components: {
    Header,
    BoardCard,
    CreateBoardModal,
  },

  computed: mapState(['board']),

  beforeCreate() {
    this.$store.dispatch('ui/setLoading', true)
  },

  async created() {
    const user = localStorage.getItem('user')
    if (!user) {
      this.$store.dispatch('user/set', await getMe())
    }
    this.$store.dispatch('board/set', await getBoards(user.id))
    this.$store.dispatch('ui/setLoading', false)
  },
}
</script>
