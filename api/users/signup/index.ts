/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** Sign up a new user. */
  post: {
    status: 201
    resBody: Types.User
    reqBody: Types.CreateUserDto
  }
}
