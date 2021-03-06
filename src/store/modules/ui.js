/* eslint-disable no-shadow */
const state = {
  overlay: {
    enable: false,
  },
  loading: {
    enable: false,
    opacity: 0.25,
  },
};

const getters = {};

const actions = {
  setLoading({ commit }, status) {
    commit('setLoading', status);
  },
  setErrors({ commit }, errors) {
    commit('setErrors', errors);
  },
};

const mutations = {
  setLoading(state, status) {
    state.loading.enable = status;
  },
  setErrors(state, errors) {
    state.errors = errors;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
