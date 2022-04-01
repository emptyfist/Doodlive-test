<template>
  <div>
    <div
      class="d-flex flex-column flex-md-row align-items-center pb-3 mt-4 mb-4"
    >
      <router-link
        to="/"
        class="d-flex align-items-center text-dark text-decoration-none"
      >
        <img
          alt="Vue logo"
          src="../assets/logo.svg"
        />
      </router-link>
      <nav
        v-if="!isLoggedIn"
        class="d-inline-flex mt-2 mt-md-0 ms-md-auto"
      >
        <img
          src="../assets/anonymous.svg"
          class="img-fluid"
          alt="anonymousImage"
        />
      </nav>
      <nav
        v-if="isLoggedIn"
        class="d-inline-flex mt-2 mt-md-0 ms-md-auto"
      >
        <a
          class="me-3 py-2 text-decoration-none btn btn-dark btn-logout"
          href="#"
          @click="handleSignOut"
        >
          Logout
        </a>
        {{ loggedInUser?.email }}
        <img
          v-if="loggedInUser?.photoURL != null"
          :src="loggedInUser?.photoURL"
          class="img-fluid profile-image"
          style="height: 20px"
          alt="profileImage"
        />
        <img
          v-if="loggedInUser?.photoURL == null"
          src="/avatar.png"
          class="img-fluid profile-image"
          alt="profileImage"
        />
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from "vuex-class"
import type { UserData } from '@/@types'

const Auth = namespace("AuthModule")

@Options({
  components: {
  }
})
export default class Navbar extends Vue {
  @Auth.Getter
  public isLoggedIn!: boolean

  @Auth.State("user")
  public loggedInUser!: UserData

  @Auth.Action
  private logOut!: () => Promise<void>

  async handleSignOut() {
    await this.logOut().then(
        () => {
          this.$router.push("/login")
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
</script>
