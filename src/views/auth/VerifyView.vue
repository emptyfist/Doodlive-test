<template>
  <div class="row horizontal-center vertical-center auth-container justify-content-md-center verify-email-container">
    <div class="card col-md-12">
      <div class="card-body">
        <h5 class="card-title">
          Email needs to be verified
        </h5>
        <div class="mb-3 dark-text">
          We have sent you a verification Email.
        </div>
        <div class="mb-6 center-aligned-text">
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
import { getModule } from 'vuex-module-decorators'
import type { ResponseData } from '@/@types'

import store from '@/store'
import Auth from '@/store/modules/auth.module'

const authModule: Auth = getModule(Auth, store)

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
  public errMsg = ''
  public isReady = false
  public resendDisabled = true
  public counter = 60
  public int = -1
  public isLoading = false

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

    await authModule.resendEmailVerification().then(
        () => {
          this.$router.push("/login")
        },
        (error: ResponseData) => {
          this.isLoading = false

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
