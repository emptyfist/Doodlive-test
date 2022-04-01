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
  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(getAuth(), email, password)
      .then((user: UserCredential) => {
        return Promise.resolve(user)
      })
      .catch((error) => {
        alert(error.code)
        return Promise.reject(null)
      })
  }

  loginGoogle(): Promise<ResponseData> {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(getAuth(), provider)
      .then(() => {
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        alert(error.code)
        return Promise.reject({ code: false, msg: '' })
      })
  }

  async logout(): Promise<ResponseData> {
    return await signOut(getAuth()).then(() => {
      return Promise.resolve({ code: true, msg: '' });
    });
  }

  async register(username: string, email: string, password: string): Promise<ResponseData> {
    return await createUserWithEmailAndPassword(getAuth(), email, password)
      .then((user: UserCredential) => {
        if (user) {
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
      .then(() => {
        return Promise.resolve({ code: true, msg: '' })
      })
      .catch((error) => {
        return Promise.resolve({ code: true, msg: error.code })
      })
  }
}

export default new AuthService();