export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'find-my-doggo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Find the doggos that suits you (spoiler, all of them).',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/global.scss'],

  // This is to make @nuxtjs/color-mode use 'dark' class not 'dark-mode'
  // So that it applies to tailwind
  colorMode: {
    classSuffix: '',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-i18n',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'https://find-my-doggo-api.herokuapp.com/', // Deployed version
    // baseURL: 'http://localhost:3001', // Used as fallback if no runtime config is provided (API_URL)
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

  i18n: {
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.js',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.js',
      },
    ],
    langDir: 'i18n/',
    defaultLocale: 'en',
    lazy: true,
    strategy: 'no_prefix',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
