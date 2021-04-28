/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** Send an email to the user to reset password. */
  post: {
    status: 200
    reqBody: Types.ForgotPasswordDto
  }
}
