import { boolean } from "yup"

export type UserData = {
  email: string,
  displayName: string
  uid: string,
  photoURL: string,
  providerId: string,
  phoneNumber: string,
  emailVerified: boolean,
  isAnonymous: boolean,
  accessToken: string,
  tenantId: string,
  creationTime: string,
  lastSignInTime: string
}

export type LoginData = {
  email: string,
  password: string
}

export type RegisterData = {
  name: string,
  email: string,
  password: string
}

export type CurrentUserData = {
  emailVerified: boolean
}