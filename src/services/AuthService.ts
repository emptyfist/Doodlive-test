import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  sendEmailVerification,
  sendPasswordResetEmail,
  UserCredential
} from "firebase/auth"
import type { ResponseData } from '@/@types'

class AuthService {
  async login(email: string, password: string): Promise<ResponseData> {
    return await signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        alert(error.code)
        return Promise.reject({ code: false, msg: '' })
      })
  }

  loginGoogle(): Promise<ResponseData> {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(getAuth(), provider)
      .then(() => {
        console.log("User signed in")
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        alert(error.code)
        return Promise.reject({ code: false, msg: '' })
      })
  }

  logout(): Promise<ResponseData> {
    return signOut(getAuth()).then(() => {
      return Promise.resolve({ code: true, msg: '' });
    });
  }

  async register(username: string, email: string, password: string): Promise<ResponseData> {
    console.log('AuthServices.ts - line 49, email : ' + email + ', password : ' + password)
    return await createUserWithEmailAndPassword(getAuth(), email, password)
      .then((user: UserCredential) => {
        if (user) {
          console.log('AuthServices.ts - line 53')
          updateProfile(getAuth().currentUser as User, {
            displayName: '',
            photoURL: ''
          })
          sendEmailVerification(getAuth().currentUser as User)
          return Promise.resolve({ code: true, msg: '' })
        }
        return Promise.resolve({ code: false, msg: '' })
      })
      .catch((error) => {
        alert(error.code)
        return Promise.reject({ code: false, msg: '' })
      })
  }

  async forgetPassword(email: string): Promise<ResponseData> {
    return await sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        alert("PasswordReset Send")
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        return Promise.reject({ code: false, msg: error.code })
      })
  }

  async resendEmailVerification(): Promise<ResponseData> {
    return await sendEmailVerification(getAuth().currentUser as User)
      .then((user) => {
        console.log(user)
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        return Promise.resolve({ code: true, msg: error.code })
      })
  }
}

export default new AuthService();