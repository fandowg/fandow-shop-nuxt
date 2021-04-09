export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  head: {
    title: 'CAMELBAK水瓶，你最好的補水夥伴，幫助你向夢想衝刺',
    htmlAttrs: {
      lang: 'zh-tw'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'CAMELBAK是世界級的補水專家，專注在補水領域，不斷思考與創新，如何更便利，更有效的飲水，每一項產品皆通過層層把關，每一個細節都在為您考慮。' },
      { hid: 'keywords', name: 'keywords', content: '喝水,補水,CAMELBAK' },
      { name: 'image', content: 'https://raw.githubusercontent.com/fandowg/fandowShop/master/src/assets/images/project_1_1.jpg' },
      { hid: 'og:title', property: 'og:title', content: 'CAMELBAK水瓶，你最好的補水夥伴，幫助你向夢想衝刺' },
      { hid: 'og:description', property: 'og:description', content: 'CAMELBAK是世界級的補水專家，專注在補水領域，不斷思考與創新，如何更便利，更有效的飲水，每一項產品皆通過層層把關，每一個細節都在為您考慮。' },
      { property: 'og:site_name', content: 'CAMELBAK品牌商城' },
      { property: 'og:image', content: 'https://raw.githubusercontent.com/fandowg/fandowShop/master/src/assets/images/project_1_1.jpg' }
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
    // { src: '@/plugins/swiper.js', mode: 'client' },
    { src: '@/plugins/directives/scrollAnimate.js', mode: 'client' },
    // { src: '@/plugins/bus.js', mode: 'client' },
    // '@/plugins/VModal.js',
    // '@/plugins/vee-validate.js',
    '@/plugins/swiper.js',
    // '@/plugins/directives/scrollAnimate.js',
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

  router: {
    base: '/fandow-shop-nuxt/',
    middleware: 'redirect',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'product-list-category-id',
        path: '/product-list/:category?/:id?',
        component: resolve(__dirname, 'pages/product-list/_id.vue')
      }, {
        name: 'order-extend',
        path: '/order',
        component: resolve(__dirname, 'pages/order.vue'),
        children: [{
          name: 'order-order-done-id',
          path: 'order/order-done/:id?',
          component: resolve(__dirname, 'pages/order/payment/_id.vue')
        }
        ]
      })
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    withCredentials: true

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
