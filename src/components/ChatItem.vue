<template>  
  <div
    id="chat-log-container"
    ref="chatLog"
    class="container-sm mt-20"
  >
    <div>
      <div class="title-container d-flex mt-20">
        <p class="chat-title">
          Chat
          <span class="chat-live-title">Live</span>
        </p>
      </div>
      <MessageItem
        v-for="{ id, text, userPhotoURL, userName, email, userId } in messages"
        :key="id"
        :username="userName"
        :email="email"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </MessageItem>
    </div>
  </div>
  <div
    ref="bottom"
    class="mt-20"
  >
  </div>
  <div class="bottom">
    <form
      v-if="isLoggedIn"
      class="d-flex send-message-form"
      @submit.prevent="send"
    >
      <input
        v-model="message"
        placeholder="Message"
        required
      />
      <button
        type="submit"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, Ref, watch, nextTick } from 'vue'
import { getModule } from 'vuex-module-decorators'
import MessageItem from './MessageItem.vue'
import { useChat } from '@/firebase-chat'
import store from '@/store'
import Auth from '@/store/modules/auth.module'

export default {
  components: {
    MessageItem
  },
  setup() {
    const authModule: Auth = getModule(Auth, store)
    
    const user = authModule.loggedInUser
    const isLoggedIn = authModule.isLoggedIn

    const { messages, sendMessage } = useChat()

    const bottom: Ref<Element | null> = ref<Element | null>(null)
    watch(
      messages,
      (/*newVal, oldVal*/) => {
        nextTick(() => {
          console.log('   scrolling to bottom !')
          bottom.value?.scrollIntoView({ behavior: 'smooth' })

          // const container = this.$refs["chatLog"] // this.$el.querySelector("#chat_log_container");
        })
      },
      { deep: true }
    )

    const message = ref('')
    const send = () => {
      sendMessage(message.value)
      message.value = ''
    }

    return { user, isLoggedIn, messages, bottom, message, send }
  }  
}
</script>
