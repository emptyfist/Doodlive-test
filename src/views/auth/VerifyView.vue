<template>
  <div class="row justify-content-md-center auth-container verify-email-container">
    <div class="card col-md-5">
      <div class="card-body">
        <h5 class="card-title">
          Email needs to be verified
        </h5>
        <div class="mb-3">
          We have sent you a verification Email.
        </div>
        <div class="mb-3">
          <button
            :disabled="isReady"
            type="submit"
            class="btn btn-primary"
            @click="resend"
          >
            Resend Verification {{ compCounter }}
          </button>
        </div>
        <div class="mb-3">
          <div
            v-if="errMsg"
            class="alert alert-danger"
            role="alert"
          >
            {{ errMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { boolean } from 'yup/lib/locale'
import { namespace } from 'vuex-class'
import type { ResponseData } from '@/@types'

const Auth = namespace("Auth")

@Options({
  props: {
    errMsg: String,
    isReady: boolean,
    resendDisabled: boolean
  },
  components: {
  }
})
export default class VerifyView extends Vue {
  private errMsg = ''
  private isReady = false
  private resendDisabled = true
  private counter = 60
  private int = -1
  private isLoading = false
  
  @Auth.Action
  private resendEmailVerification!: () => Promise<ResponseData>

  get compCounter() {
    if (this.resendDisabled == false)
      return '';
    else
      return "(" + this.counter + ")"
  }

  set compCounter(value) {
    this.counter = parseInt(value)
  }

  mounted() {
    this.isReady = this.resendDisabled || this.isLoading
    this.disableButton()
  }

  disableButton() {
    if (this.int != -1)
      clearInterval(this.int)

    this.counter = 60
    this.resendDisabled = true
    this.int = setInterval(() => {
      if (this.counter <= 0) {
        this.resendDisabled = false
        clearInterval(this.int)
      } else {
        this.counter--
      }
    }, 1000)
  }

  async resend() {
    this.isLoading = true

    this.resendEmailVerification().then(
        (data: ResponseData) => {
          console.log('date : ' + data + ', Trying to login !')
          this.$router.push("/login")
        },
        (error: ResponseData) => {
          this.isLoading = false
          console.log(error)
          switch (error.msg) {
            case 'auth/too-many-requests':
                this.errMsg = 'You made to many requests please wait some time...'
                break
            default:
                this.errMsg = "Resending verification failed..."
                break
          }
        }
      )
  }  
}
</script>
