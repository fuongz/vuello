/* eslint-disable no-shadow */
import { getBoard, getBoards } from '../../api/board'

const state = {
  boards: [],
  board: {},
}

const actions = {
  set({ commit }, boards) {
    commit('set', boards)
  },
  setBoard({ commit }, board) {
    commit('setBoard', board)
  },
  async refreshBoard({ commit }, boardId) {
    const board = await getBoard(boardId)
    commit('refreshBoard', board)
  },
  async reload({ commit }) {
    const boards = await getBoards()
    commit('reload', boards)
  },
}

const mutations = {
  set(state, boards) {
    state.boards = boards
  },
  setBoard(state, board) {
    state.board = board
  },
  refreshBoard(state, board) {
    state.board = board
  },
  reload(state, boards) {
    state.boards = boards
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
