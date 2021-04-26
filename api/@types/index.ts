/* eslint-disable */
export type Role = {
  id: number
  name: string
}

export type CreateUserDto = {
  email: string
  password: string
  name: string
  roles?: Role[]
}

export type User = {
  email: string
  id: number
  name: string
  roles?: Role[]
}

export type UpdateUserDto = {
  email?: string
  password?: string
  roles?: string[]
  id?: number
  name?: string
}

export type LoginUserDto = {
  email: string
  password: string
}

export type LoggedInUserDto = {
  access_token: string
}
