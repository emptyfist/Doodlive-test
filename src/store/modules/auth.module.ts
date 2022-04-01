import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import AuthService from '@/services/AuthService'
import { UserCredential, User } from "firebase/auth"
import type { LoginData, RegisterData, ResponseData, UserData } from '@/@types'

const storedUser = localStorage.getItem('user')

@Module({  
  namespaced: true,
  name: 'AuthModule'
})
class Auth extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false }
  public user = storedUser ? JSON.parse(storedUser) : null

  @Mutation
  public loginSuccess(user: UserCredential): void {
    if (user == null) return

    this.status.loggedIn = true
    const tempUser = user?.user != null ? user?.user : null
    if (tempUser == null) return

    console.log('auth.module.ts -> logged-in user : ', tempUser)
    localStorage.setItem('user', JSON.stringify({
      email: tempUser?.email != null ? tempUser?.email : '',
      displayName: tempUser?.displayName != null ? tempUser?.displayName : '',
      uid: tempUser?.uid != null ? tempUser?.uid : '',
      photoURL: tempUser?.photoURL != null ? tempUser?.photoURL : '/avatar.png',   // sample avatar for demo show
      providerId: tempUser?.providerId != null ? tempUser?.providerId : '',
      phoneNumber: tempUser?.phoneNumber != null ? tempUser?.phoneNumber : '',
      emailVerified: tempUser?.emailVerified != null ? tempUser?.emailVerified : '',
      isAnonymous: tempUser?.isAnonymous != null ? tempUser?.isAnonymous : '',
      accessToken: tempUser?.refreshToken != null ? tempUser?.refreshToken : '',
      tenantId: tempUser?.tenantId != null ? tempUser?.tenantId : '',
      creationTime: tempUser?.metadata != null && tempUser?.metadata.creationTime != null ? tempUser?.metadata.creationTime : '',
      lastSignInTime: tempUser?.metadata != null && tempUser?.metadata.lastSignInTime != null ? tempUser?.metadata.lastSignInTime : '',
    }))
    this.user = tempUser
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false
    this.user = null
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false
    this.user = null
    localStorage.removeItem('user')
  }

  @Mutation
  public registerSuccess(): void {
    this.status.loggedIn = false
  }

  @Mutation
  public registerFailure(): void {
    this.status.loggedIn = false
  }

  @Action({ rawError: true })
  async login(data: LoginData): Promise<UserCredential> {
    return await AuthService.login(data.email, data.password).then(
      user => {
        this.context.commit('loginSuccess', user)
        return Promise.resolve(user)
      },
      error => {
        this.context.commit('loginFailure')
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject({ code: false, msg: message });
      }
    );
  }

  @Action
  async logOut(): Promise<void> {
    return await AuthService.logout()
      .then(() => {
        this.context.commit('logout')
      })
  }

  @Action({ rawError: true })
  async register(data: RegisterData): Promise<ResponseData> {
    return await AuthService.register(data.name, data.email, data.password).then(
      response => {
        this.context.commit('registerSuccess')
        return Promise.resolve(response)
      },
      error => {
        this.context.commit('registerFailure')
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      }
    );
  }

  @Action({ rawError: true })
  async forgetPassword(data: string): Promise<ResponseData> {
    return await AuthService.forgetPassword(data).then(
      res => {
        console.log(res)
        return Promise.resolve({ code: true, msg: '' })
      },
      error => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject({ code: false, msg: message });
      }
    );
  }

  @Action({ rawError: true })
  async resendEmailVerification(): Promise<ResponseData> {
    return await AuthService.resendEmailVerification().then(
      user => {
        return Promise.resolve(user)
      },
      error => {
        return Promise.reject({ code: false, msg: error.msg });
      }
    );
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn
  }

  get loggedInUser(): UserData {
    return this.user
  }

}

export default Auth;