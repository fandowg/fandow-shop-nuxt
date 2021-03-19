export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fandow-shop-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/Loading.js', mode: 'client' },
    { src: '@/plugins/VModal.js', mode: 'client' },
    { src: '@/plugins/vee-validate.js', mode: 'client' },
    { src: '@/plugins/swiper.js', mode: 'client' },
    { src: '@/plugins/directives/scrollAnimate.js', mode: 'client' },
    // { src: '@/plugins/bus.js', mode: 'client' },
    '@/plugins/bus.js',
    '@/plugins/filters.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],
  env: {
    VUE_APP_APIPATH: 'https://vue-course-api.hexschool.io',
    VUE_APP_CUSTOMPATH: 'fandow',
    VUE_APP_MAX_QTY: 10
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
