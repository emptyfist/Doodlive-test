<template>  
  <!-- <div class="container-sm mt-20">
    <div class="mx-5">
      <MessageItem
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.email"
      >
        {{ text }}
      </MessageItem>
    </div>
  </div> -->
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
import { ref, watch, nextTick } from 'vue'
import { getModule } from 'vuex-module-decorators'
// import MessageItem from './MessageItem.vue'
import { useChat } from '@/firebase-chat'
import store from '@/store'
import Auth from '@/store/modules/auth.module'

export default {
  components: {
    // MessageItem
  },
  setup() {
    const authModule: Auth = getModule(Auth, store)
    
    const user = authModule.loggedInUser
    const isLoggedIn = authModule.isLoggedIn

    const { messages, sendMessage } = useChat()

    const bottom = ref(null)
    watch(
      messages,
      () => {
        nextTick(() => {
          console.log('123')
          // bottom.value?.scrollIntoView({ behavior: 'smooth' })
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
