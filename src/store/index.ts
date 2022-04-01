import { createStore } from 'vuex'

import Auth from './modules/auth.module'
import Chat from './modules/chat.module'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthModule: Auth,
    ChatModule: Chat
  }
})
