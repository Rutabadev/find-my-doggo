import { Plugin } from '@nuxt/types'

const authLangRedirectPlugin: Plugin = ({ app, $auth }) => {
  $auth.onRedirect((to: any) => {
    return app.localePath(to)
  })
}

export default authLangRedirectPlugin
