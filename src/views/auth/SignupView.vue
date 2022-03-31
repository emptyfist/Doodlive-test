<template>
  <div class="align-items-center horizontal-center vertical-center auth-container register-container">
    <form @submit.prevent="userRegistration">
      <h2>Sign Up</h2>
      <div class="form-group mt-4">
        <input
          v-model="user.name"
          type="text"
          required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Name</label>
      </div>
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
      <div class="form-group mb-4">
        <input
          v-model="confirmPassword"
          type="password"
          required
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Confirm Password</label>
      </div>
      <button
        type="submit"
        class="btn btn-dark btn-register mt-2"
        :disabled="loading"
      >
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm"
        ></span>
        <span>Continue</span>
      </button>
      <p class="forgot-password text-right mt-2">
        Already registered
        <router-link
          :to="{name: 'login'}"
        >
          Sign In?
        </router-link>
      </p>
    </Form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import type { RegisterData, ResponseData } from '@/@types'
import { boolean } from 'yup/lib/locale'

const Auth = namespace("Auth")

@Options({
  props: {
    loading: boolean
  },
  components: {
    Form,
    Field,
    ErrorMessage
  }
})
export default class SignupView extends Vue {
  private user: RegisterData = { name: '', email: '', password: '' }
  private confirmPassword = ''
  private loading = false
  private message = ''
  private schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
  });

  @Auth.Action
  private register!: (data: RegisterData) => Promise<ResponseData>

  userRegistration() {
    this.loading = false
    if (this.user.name == '' || this.user.email == '' || this.user.password == '') {
      alert('Please make sure the input values !')
      return
    }

    console.log('this.user.password = ', this.user.password)
    console.log('this.confirmPassword = ', this.confirmPassword)
    if (this.user.password != this.confirmPassword) {
      alert('Passwords do not match !')
      return
    }
    
    this.loading = true
    this.register(this.user).then(
      () => {
        this.$router.push("/login")
      },
      (error: ResponseData) => {
        this.loading = false
        this.message = error.msg
      }
    )
  }
}
</script>