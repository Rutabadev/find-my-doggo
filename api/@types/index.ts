/* eslint-disable */
export type LoginUserDto = {
  email: string
  password: string
}

export type LoggedInUserDto = {
  access_token: string
}

export type Role = {
  id: number
  name: string
}

export type User = {
  email: string
  id: number
  name: string
  emailValid: boolean
  roles: Role[]
}

export type CreateUserDto = {
  email: string
  password: string
  name: string
}

export type ForgotPasswordDto = {
  email: string
}

export type ChangePasswordDto = {
  uuid: string
  password: string
}

export type ValidateEmailDto = {
  uuid: string
}

export type UpdateUserDto = {
  email?: string
  password?: string
  roles?: string[]
  id?: number
  name?: string
  emailValid?: boolean
}
