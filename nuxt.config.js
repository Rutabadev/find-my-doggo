export default {
  env: {
    version: JSON.stringify(require('./package.json').version),
    startTime: Date.now(),
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Find My Doggo',
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

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.pcss',
  },

  // This is to make @nuxtjs/color-mode use 'dark' class not 'dark-mode'
  // so that it applies to tailwind
  colorMode: {
    classSuffix: '',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/api' }],

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
    scopeKey: 'roles',
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/auth/me', method: 'get' },
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
      {
        code: 'djeun',
        iso: 'dj-DJ',
        file: 'djeun.js',
      },
    ],
    vueI18n: {
      fallbackLocale: 'en',
    },
    langDir: 'i18n/',
    defaultLocale: 'en',
    lazy: true,
    strategy: 'no_prefix',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
