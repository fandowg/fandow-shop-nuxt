import Vue from 'vue'

// import axios from 'axios'

const state = () => ({
  productsAll: [],
  categories: []
})

const actions = {
  async getProductsAll (context) {
    context.commit('LOADING', true, { root: true })
    const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
    const response = await this.$axios.get(url)
    if (response.data.success) {
      context.commit('PRODUCTSALL', response.data.products)
      context.commit('CATEGORIES', response.data.products)
    } else {
      Vue.prototype.$bus.$emit('message:push', '取得資料錯誤', 'text-danger')
    }
    context.commit('LOADING', false, { root: true })
    // this.$axios.get(url).then((response) => {
    //   // $get會取到response裡的data
    //   // console.log(response)

    // })
  }
}

const mutations = {
  PRODUCTSALL (state, payload) {
    state.productsAll = payload
  },
  CATEGORIES (state, payload) {
    payload.forEach((item) => {
      if (!state.categories.includes(item.category)) { state.categories.push(item.category) }
    })
  }
}

const getters = {
  categories (state) {
    return state.categories
  },
  productsAll (state) {
    return state.productsAll
  }
}

export default {
  strict: true,
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

// export default {
//   strict: true,
//   namespaced: true,
//   state: {
//     productsAll: [],
//     categories: []

//   },
//   actions: {

//     getProductsAll (context) {
//       context.commit('LOADING', true, { root: true })
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
//       axios.get(url).then((response) => {
//         if (response.data.success) {
//           context.commit('PRODUCTSALL', response.data.products)
//           context.commit('CATEGORIES', response.data.products)
//         } else {
//           Vue.prototype.$bus.$emit('message:push', '取得資料錯誤', 'text-danger')
//         }
//         context.commit('LOADING', false, { root: true })
//       })
//     }
//   },
//   mutations: {

//     PRODUCTSALL (state, payload) {
//       state.productsAll = payload
//     },
//     CATEGORIES (state, payload) {
//       payload.forEach((item) => {
//         if (state.categories.indexOf(item.category) === -1) { state.categories.push(item.category) }
//       })
//     }
//   },
//   getters: {

//     categories (state) {
//       return state.categories
//     },
//     productsAll (state) {
//       return state.productsAll
//     }
//   }
// }
