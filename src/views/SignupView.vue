<template>
  <div class="vue-tempalte">
    <Form
      :validation-schema="schema"
      @submit="userRegistration"
    >
      <h3>Sign Up</h3>
      <div class="form-group">
        <label>Name</label>
        <Field
          name="name"
          type="text"
          class="form-control form-control-lg"
        />
        <ErrorMessage name="name" />
      </div>
      <div class="form-group">
        <label>Email address</label>
        <Field
          name="email"
          type="email"
          class="form-control form-control-lg"
        />
        <ErrorMessage name="email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <Field
          name="password"
          type="password"
          class="form-control form-control-lg"
        />
        <ErrorMessage name="password" />
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
    </Form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from "vuex-class"
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import type { RegisterData, ResponseData } from '@/@types'

const Auth = namespace("Auth")

@Options({
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
  private schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
  });

  @Auth.Action
  private register!: (data: RegisterData) => Promise<ResponseData>

  userRegistration(values: RegisterData) {
    this.loading = false
    console.log('values = ', values)
    if (values.name && values.email && values.password) {
      console.log('trying to register')
      this.loading = true
      this.register(values).then(
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
  }
}
</script>
