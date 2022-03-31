<template>
  <div class="horizontal-center vertical-center auth-container login-container">
    <form @submit.prevent="userLogin">
      <h3>Sign In</h3>
      <div class="form-group">
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
        class="btn btn-dark btn-login"
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
        (data: ResponseData) => {
          console.log(data)
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
