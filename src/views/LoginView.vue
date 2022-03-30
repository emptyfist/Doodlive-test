<template>
  <div class="vue-tempalte">
    <form @submit.prevent="userLogin">
      <h3>Sign In</h3>
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control form-control-lg"
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control form-control-lg"
        />
      </div>
      <button
        type="submit"
        class="btn btn-dark btn-lg btn-block"
        :disabled="loading"
      >
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm"
        ></span>
        <span>Sign In</span>
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

  userLogin() {
    this.loading = true;
    // this.$validator.validateAll().then((isValid: boolean) => {
      /*if (!isValid) {
        this.loading = false;
        return;
      }*/

      if (this.user.email && this.user.password) {
        this.login(this.user).then(
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
    // });
  }
}
</script>
