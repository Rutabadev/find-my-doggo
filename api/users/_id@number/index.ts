/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
  }

  patch: {
    status: 200
    resBody: Types.User
    reqBody: Types.UpdateUserDto
  }

  delete: {
    status: 200
  }
}
