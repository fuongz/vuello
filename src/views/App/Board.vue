<template>
  <div class="BoardHome">
    <!-- Extra Components -->
    <Header />
    <Modal />

    <!-- Container App -->
    <div class="w-full mx-auto px-4 mt-4 app-container">
      <BoardHeader :board="board" />
      <BoardColumn :board="board" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { getBoard } from '../../api/board'

import Header from '../../components/layout/Header.vue'
import Modal from '../../components/Modal.vue'

import BoardHeader from '../../components/Board/Header.vue'
import BoardColumn from '../../components/Board/Column.vue'

export default {
  components: {
    Header,
    Modal,
    BoardHeader,
    BoardColumn,
  },
  computed: mapState(['user', 'board']),
  beforeCreate() {
    this.$store.dispatch('ui/setLoading', true)
  },
  async created() {
    const res = await getBoard(this.$route.params.id)
    this.$store.dispatch('board/setBoard', res)
    this.$store.dispatch('ui/setLoading', false)
  },
  methods: {},
}
</script>
