<template>
  <div>
    <div class="container">
      <!-- <Navbar /> -->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
  // import { Options, Vue } from 'vue-class-component'
  // import Navbar from "@/components/Navbar.vue"

  // console.log("APP.vue: setup call")

  // @Options({
  //   components: {
  //     Navbar
  //   }
  // })
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #1c1833;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
