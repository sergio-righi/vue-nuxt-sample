import { resolve } from 'path'
import { i18n } from './utils'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-nuxt-sample',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  pageTransition: 'page',

  loading: { color: 'white' },

  loadingIndicator: {
    name: 'circle',
    color: 'black',
    background: 'white',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/filter',
    '~/plugins/service',
    '~/plugins/resolve',
    '~/plugins/repository',
    // "~/plugins/vuex-persist.client",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-i18n', '@nuxtjs/axios'],

  axios: {
    // proxy: true,
    progress: false,
    baseUrl: process.env.BASE_URL || 'http://localhost:4000/',
    headers: {
      common: {
        Authorization:
          process.env.API_TOKEN || 'D2GZvPTl8c5GAQX8ZyvOlq72Jnukl5Tu',
      },
    },
  },

  alias: {
    utils: resolve(__dirname, './utils'),
    models: resolve(__dirname, './models'),
    components: resolve(__dirname, './components'),
  },

  i18n: {
    seo: true,
    lazy: true,
    langDir: '~/locales/',
    parsePages: false,
    vueI18nLoader: true,
    locales: [
      { code: 'en-CA', iso: 'en-CA', name: 'English', file: 'en-CA.json' },
    ],
    vueI18n: i18n,
    defaultLocale: 'en-CA',
    strategy: 'prefix_and_default',
  },

  router: {
    middleware: ['authentitcation'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
