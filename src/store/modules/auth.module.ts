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
  public loginSuccess(user: User | UserCredential): void {
    if (user == null) return

    this.status.loggedIn = true
    let tempUser: User | UserCredential | undefined | null
    if ("user" in user) {
      tempUser = user?.user != null ? user?.user : null
    }

    if (tempUser == null) {
      tempUser = user
    }

    let email = ''
    if ("email" in tempUser) {
      email = tempUser?.email != null ? tempUser?.email : ''
    }

    let displayName = ''
    if ("displayName" in tempUser) {
      displayName = tempUser?.displayName != null ? tempUser?.displayName : ''
    }

    let uid = ''
    if ("uid" in tempUser) {
      uid = tempUser?.uid != null ? tempUser?.uid : ''
    }

    let photoURL = '/avatar.png'
    if ("photoURL" in tempUser) {
      photoURL = tempUser?.photoURL != null ? tempUser?.photoURL : ''
    }

    let providerId = ''
    if ("providerId" in tempUser) {
      providerId = tempUser?.providerId != null ? tempUser?.providerId : ''
    }

    let phoneNumber = ''
    if ("phoneNumber" in tempUser) {
      phoneNumber = tempUser?.phoneNumber != null ? tempUser?.phoneNumber : ''
    }

    let emailVerified = false
    if ("emailVerified" in tempUser) {
      emailVerified = tempUser?.emailVerified != null ? tempUser?.emailVerified : false
    }

    let isAnonymous = false
    if ("isAnonymous" in tempUser) {
      isAnonymous = tempUser?.isAnonymous != null ? tempUser?.isAnonymous : false
    }

    let accessToken = ''
    if ("refreshToken" in tempUser) {
      accessToken = tempUser?.refreshToken != null ? tempUser?.refreshToken : ''
    }

    let tenantId = ''
    if ("tenantId" in tempUser) {
      tenantId = tempUser?.tenantId != null ? tempUser?.tenantId : ''
    }

    let creationTime = ''
    if ("metadata" in tempUser) {
      if ("creationTime" in tempUser?.metadata) {
        creationTime = tempUser?.metadata.creationTime != null ? tempUser?.metadata.creationTime : ''
      }
    }

    let lastSignInTime = ''
    if ("metadata" in tempUser) {
      if ("lastSignInTime" in tempUser?.metadata) {
        lastSignInTime = tempUser?.metadata.lastSignInTime != null ? tempUser?.metadata.lastSignInTime : ''
      }
    }

    localStorage.setItem('user', JSON.stringify({
      email: email,
      displayName: displayName,
      uid: uid,
      photoURL: photoURL,   // sample avatar for demo show
      providerId: providerId,
      phoneNumber: phoneNumber,
      emailVerified: emailVerified,
      isAnonymous: isAnonymous,
      accessToken: accessToken,
      tenantId: tenantId,
      creationTime: creationTime,
      lastSignInTime: lastSignInTime,
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
  async login(data: LoginData): Promise<User | UserCredential> {
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
      () => {
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
