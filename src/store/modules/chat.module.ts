import { VuexModule, Module } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'ChatModule'
})
class Chat extends VuexModule {
}

export default Chat;
