<template>
  <img
    :src="src"
    class="avatar"
  />
</template>

<script lang="ts">
export default {
  props: { src: { type: String, default: '' } }
}
</script>
