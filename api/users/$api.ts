/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'
// prettier-ignore
import { Methods as Methods1 } from './_id@string'
// prettier-ignore
import { Methods as Methods2 } from './forgot-password'
// prettier-ignore
import { Methods as Methods3 } from './reset-password'
// prettier-ignore
import { Methods as Methods4 } from './signup'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3001' : baseURL).replace(/\/$/, '')
  const PATH0 = '/users'
  const PATH1 = '/users/forgot-password'
  const PATH2 = '/users/reset-password'
  const PATH3 = '/users/signup'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    _id: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        patch: (option: { body: Methods1['patch']['reqBody'], config?: T }) =>
          fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix0, PATCH, option).json(),
        $patch: (option: { body: Methods1['patch']['reqBody'], config?: T }) =>
          fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix0, PATCH, option).json().then(r => r.body),
        delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send(),
        $delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(prefix, prefix0, DELETE, option).send().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    },
    forgot_password: {
      /**
       * Send an email to the user to reset password.
       */
      post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, PATH1, POST, option).send(),
      /**
       * Send an email to the user to reset password.
       */
      $post: (option: { body: Methods2['post']['reqBody'], config?: T }) =>
        fetch<void, BasicHeaders, Methods2['post']['status']>(prefix, PATH1, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH1}`
    },
    reset_password: {
      post: (option: { body: Methods3['post']['reqBody'], config?: T }) =>
        fetch<void, BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option).send(),
      $post: (option: { body: Methods3['post']['reqBody'], config?: T }) =>
        fetch<void, BasicHeaders, Methods3['post']['status']>(prefix, PATH2, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    signup: {
      /**
       * Sign up a new user.
       */
      post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
        fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH3, POST, option).json(),
      /**
       * Sign up a new user.
       */
      $post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
        fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH3, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`
    },
    post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
    $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
      fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
    get: (option?: { config?: T }) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json(),
    $get: (option?: { config?: T }) =>
      fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
