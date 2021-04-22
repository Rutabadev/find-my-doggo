export type Role = {
  value: string
}

export type User = {
  name: string
  email?: string
  roles: Role[]
}

export type FormError = {
  field: string
  message: string
}
