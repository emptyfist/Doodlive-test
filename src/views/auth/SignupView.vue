<template>
  <div class="align-items-center horizontal-center vertical-center auth-container register-container">
    <Form
      v-slot="{ loading }"
      :validation-schema="schema"
      @submit="userRegistration"
    >
      <h3>Sign Up</h3>
      <div class="form-group">
        <Field
          name="name"
          type="text"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Name</label>
        <ErrorMessage name="name" />
      </div>
      <div class="form-group">
        <Field
          name="email"
          type="email"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Email address</label>
        <ErrorMessage name="email" />
      </div>
      <div class="form-group">
        <Field
          name="password"
          type="password"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Password</label>
        <ErrorMessage name="password" />
      </div>
      <button
        type="submit"
        class="btn btn-dark btn-register"
        :disabled="loading"
        :class="{ 'submitting': loading }"
      >
        <span
          v-show="loading"
          class="spinner-border spinner-border-sm"
        ></span>
        <span>Continue</span>
      </button>
      <p class="forgot-password text-right">
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
  private loading = false
  private message = ''
  private schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
  });

  @Auth.Action
  private register!: (data: RegisterData) => Promise<ResponseData>

  userRegistration(values: RegisterData) {
    // return new Promise(resolve => {        
    //   setTimeout(() => {
    //     resolve(JSON.stringify(values, null, 2));
    //   }, 2000);
    // })

    this.loading = false
    console.log('values = ', values)
    if (values.name && values.email && values.password) {
      console.log('trying to register')
      this.loading = true
      this.register(values).then(
        (data: ResponseData) => {
          console.log('date : ' + data + ', Trying to login !')
          this.$router.push("/login")
        },
        (error: ResponseData) => {
          this.loading = false
          this.message = error.msg
        }
      )
    }
  }
}
</script>
