export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'find-my-doggo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/global.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:3001', // Used as fallback if no runtime config is provided (API_URL)
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/users/login', method: 'post' },
          user: { url: '/users/me', method: 'get' },
          logout: false,
        },
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
