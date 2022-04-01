<template>
  <div class="align-items-center horizontal-center vertical-center auth-container">
    <form @submit.prevent="forgetPasswordHandler">
      <h2>Reset Password</h2>
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="email"
          type="email"
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
        <span>Reset password</span>
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
import { getModule } from 'vuex-module-decorators'
import type { ResponseData } from '@/@types'
import store from '@/store'
import Auth from '@/store/modules/auth.module'

const authModule: Auth = getModule(Auth, store)

@Options({
  components: {
  }
})
export default class ForgotPasswordView extends Vue {
  public email = ''
  public loading = false
  public message = ''

  async forgetPasswordHandler() {
    this.loading = false
    
    if (this.email) {
      this.loading = true

      await authModule.forgetPassword(this.email).then(
        (data: ResponseData) => {
          this.loading = false
          console.log(data)
          alert('Check your registered email to reset the password!')
          this.email = ''
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
