import { boolean } from "yup"

export type UserData = {
  email: string
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