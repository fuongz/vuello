/* eslint-disable no-shadow */
import Vue from 'vue'
import { setToken, setUser } from '../../api/user'

// State
const state = {
  loggedInStatus: localStorage.getItem('user') ? 1 : 0,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
}

// Getters
const getters = {
  loggedUser: (state) => state.user,
}

// Actions
const actions = {
  login({ commit }, { token, user }) {
    setToken({ token, user })
    Vue.$cookies.set('token', token)
    commit('login', { token, user })
  },
  set({ commit }, user) {
    setUser(user)
    commit('set', user)
  },
  logout({ commit }) {
    Vue.$cookies.remove('token')
    setToken({ token: '', user: {} })
    commit('logout')
  },
}

// Mutations
const mutations = {
  login(state, { token, user }) {
    state.loggedInStatus = true
    state.token = token
    state.user = user
  },
  logout(state) {
    state.user = {}
  },
  set(state, user) {
    state.user = user
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
