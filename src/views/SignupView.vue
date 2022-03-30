<template>
  <div class="vue-tempalte">
    <form @submit.prevent="userRegistration">
      <h3>Sign Up</h3>
      <div class="form-group">
        <label>Name</label>
        <input
          v-model="user.name"
          type="text"
          class="form-control form-control-lg"
        />
      </div>
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
        <span>Sign Up</span>
      </button>
      <p class="forgot-password text-right">
        Already registered
        <router-link
          :to="{name: 'login'}"
        >
          Sign In?
        </router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from "vuex-class"
import type { RegisterData, ResponseData } from '@/@types'

const Auth = namespace("Auth")

@Options({
  components: {
  }
})
export default class SignupView extends Vue {
  private user: RegisterData = { name: '', email: '', password: '' }
  private loading = false
  private message = ''

  @Auth.Action
  private register!: (data: RegisterData) => Promise<ResponseData>

  userRegistration() {
    this.loading = true;
    // this.$validator.validateAll().then((isValid: boolean) => {
      /*if (!isValid) {
        this.loading = false;
        return;
      }*/

      if (this.user.name && this.user.email && this.user.password) {
        this.register(this.user).then(
          (data: ResponseData) => {
            console.log(data)
            this.$router.push("/login")
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
