<template>
  <div class="align-items-center horizontal-center vertical-center auth-container login-container">
    <form @submit.prevent="userLogin">
      <h2>Sign In</h2>
      <div class="form-group mt-4">
        <input
          v-model="user.email"
          type="email"
          required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Email address</label>
      </div>
      <div class="form-group">
        <input
          v-model="user.password"
          type="password"
          required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <button
        type="submit"
        class="btn btn-dark btn-login mt-2"
        :disabled="loading"
      >
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm"
        ></span>
        <span>Continue</span>
      </button>
      <p class="forgot-password text-right mt-2 mb-4">
        <router-link
          to="/forgot-password"
        >
          Forgot password ?
        </router-link>
      </p>
      <p class="forgot-password text-right mt-2 mb-4">
        Not registered ?
        <router-link
          to="/signup"
        >
          Create Account
        </router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from "vuex-class"
import type { LoginData, ResponseData } from '@/@types'

const Auth = namespace("Auth")

@Options({
  components: {
  }
})
export default class LoginView extends Vue {
  private user: LoginData = { email: "", password: "" }
  private loading = false
  private message = ""

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: LoginData) => Promise<ResponseData>

  async userLogin() {
    this.loading = true;

    if (this.user.email && this.user.password) {
      await this.login(this.user).then(
        () => {
          console.log('5')
          this.$router.push("/home")
        },
        (error: ResponseData) => {
          this.loading = false
          this.message = error.msg
        }
      );
    }
  }
}
</script>
