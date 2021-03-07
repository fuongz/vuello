import Vue from 'vue'
import Vuex from 'vuex'

import ui from './modules/ui'
import user from './modules/user'
import board from './modules/board'
import taskGroup from './modules/taskGroup'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    user,
    board,
    taskGroup,
    task,
  },
})
