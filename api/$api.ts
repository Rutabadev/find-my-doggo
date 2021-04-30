/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './auth/login'
// prettier-ignore
import { Methods as Methods1 } from './auth/me'
// prettier-ignore
import { Methods as Methods2 } from './ping'
// prettier-ignore
import { Methods as Methods3 } from './roles'
// prettier-ignore
import { Methods as Methods4 } from './users'
// prettier-ignore
import { Methods as Methods5 } from './users/_id@string'
// prettier-ignore
import { Methods as Methods6 } from './users/forgot-password'
// prettier-ignore
import { Methods as Methods7 } from './users/reset-password'
// prettier-ignore
import { Methods as Methods8 } from './users/signup'
// prettier-ignore
import { Methods as Methods9 } from './users/validate-email'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3001' : baseURL).replace(/\/$/, '')
  const PATH0 = '/auth/login'
  const PATH1 = '/auth/me'
  const PATH2 = '/ping'
  const PATH3 = '/roles'
  const PATH4 = '/users'
  const PATH5 = '/users/forgot-password'
  const PATH6 = '/users/reset-password'
  const PATH7 = '/users/signup'
  const PATH8 = '/users/validate-email'
  const GET = 'GET'
  const POST = 'POST'
  const DELETE = 'DELETE'
  const PATCH = 'PATCH'

  return {
    auth: {
      login: {
        post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
          fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      me: {
        /**
         * Get currently logged user information.
         */
        get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH1, GET, option).json(),
        /**
         * Get currently logged user information.
         */
        $get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    },
    ping: {
      get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).send(),
      $get: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods2['get']['status']>(prefix, PATH2, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`
    },
    roles: {
      get: (option?: { config?: T }) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<Methods3['get']['resBody'], BasicHeaders, Methods3['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH3}`
    },
    users: {
      _id: (val1: string) => {
        const prefix1 = `${PATH4}/${val1}`

        return {
          get: (option?: { config?: T }) =>
            fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          patch: (option: { body: Methods5['patch']['reqBody'], config?: T }) =>
            fetch<Methods5['patch']['resBody'], BasicHeaders, Methods5['patch']['status']>(prefix, prefix1, PATCH, option).json(),
          $patch: (option: { body: Methods5['patch']['reqBody'], config?: T }) =>
            fetch<Methods5['patch']['resBody'], BasicHeaders, Methods5['patch']['status']>(prefix, prefix1, PATCH, option).json().then(r => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods5['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      },
      forgot_password: {
        /**
         * Send an email to the user to reset password.
         */
        post: (option: { body: Methods6['post']['reqBody'], config?: T }) =>
          fetch<void, BasicHeaders, Methods6['post']['status']>(prefix, PATH5, POST, option).send(),
        /**
         * Send an email to the user to reset password.
         */
        $post: (option: { body: Methods6['post']['reqBody'], config?: T }) =>
          fetch<void, BasicHeaders, Methods6['post']['status']>(prefix, PATH5, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH5}`
      },
      reset_password: {
        post: (option: { body: Methods7['post']['reqBody'], config?: T }) =>
          fetch<void, BasicHeaders, Methods7['post']['status']>(prefix, PATH6, POST, option).send(),
        $post: (option: { body: Methods7['post']['reqBody'], config?: T }) =>
          fetch<void, BasicHeaders, Methods7['post']['status']>(prefix, PATH6, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH6}`
      },
      signup: {
        /**
         * Sign up a new user.
         */
        post: (option: { body: Methods8['post']['reqBody'], config?: T }) =>
          fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(prefix, PATH7, POST, option).json(),
        /**
         * Sign up a new user.
         */
        $post: (option: { body: Methods8['post']['reqBody'], config?: T }) =>
          fetch<Methods8['post']['resBody'], BasicHeaders, Methods8['post']['status']>(prefix, PATH7, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH7}`
      },
      validate_email: {
        post: (option: { body: Methods9['post']['reqBody'], config?: T }) =>
          fetch<void, BasicHeaders, Methods9['post']['status']>(prefix, PATH8, POST, option).send(),
        $post: (option: { body: Methods9['post']['reqBody'], config?: T }) =>
          fetch<void, BasicHeaders, Methods9['post']['status']>(prefix, PATH8, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH8}`
      },
      post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
        fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH4, POST, option).json(),
      $post: (option: { body: Methods4['post']['reqBody'], config?: T }) =>
        fetch<Methods4['post']['resBody'], BasicHeaders, Methods4['post']['status']>(prefix, PATH4, POST, option).json().then(r => r.body),
      get: (option?: { config?: T }) =>
        fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH4, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<Methods4['get']['resBody'], BasicHeaders, Methods4['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH4}`
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
