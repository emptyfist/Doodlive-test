<template>
  <div class="message">
    <div
      class="d-flex"
    >
      <AvatarItem
        :src="photoUrl"
        class="mt-1"
      />
      <div
        :class="sender ? 'bg-green-500' : 'bg-gray-300'"
        class="text w-3/4"
      >
        <span class="username">
          @{{ username }}:
        </span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AvatarItem from './AvatarItem.vue'

export default {
  components: { AvatarItem },
  props: {
    username: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>
