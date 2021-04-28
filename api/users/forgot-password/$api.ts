/* eslint-disable */
// prettier-ignore
import { AspidaClient, BasicHeaders } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from '.'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3001' : baseURL).replace(/\/$/, '')
  const PATH0 = '/users/forgot-password'
  const POST = 'POST'

  return {
    /**
     * Send an email to the user to reset password.
     */
    post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).send(),
    /**
     * Send an email to the user to reset password.
     */
    $post: (option: { body: Methods0['post']['reqBody'], config?: T }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
    $path: () => `${prefix}${PATH0}`
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api
