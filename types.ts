export type Role = {
  value: string
}

export type User = {
  name: string
  email?: string
  roles: Role[]
}
