// import Vue from 'vue'
// import axios from 'axios'

const state = () => ({
  cart: {
    carts: []
  }
})

const actions = {
  getCart (context) {
    const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    context.commit('LOADING', true, {
      root: true
    })
    this.$axios.$get(url).then((response) => {
      if (response.data.success) {
        context.commit('CART', response.data.data)
      } else {
        this.$bus.$emit('message:push', '取得資料錯誤', 'text-danger')
      }
      context.commit('LOADING', false, {
        root: true
      })
    })
  },
  deleteCart (context, id) {
    const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
    context.commit('LOADING', true, {
      root: true
    })
    this.$axios.$delete(url).then((response) => {
      if (response.data.success) {
        this.$bus.$emit('message:push', response.data.message)
        context.dispatch('getCart')
      } else {
        this.$bus.$emit('message:push', '刪除失敗', 'text-danger')
      }
      context.commit('LOADING', false, {
        root: true
      })
    })
  },
  mixCart (context, mixCartInfo) {
    const {
      id,
      cart
    } = mixCartInfo
    const urlDelete = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
    const urlAddCart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    context.commit('LOADING', true, {
      root: true
    })
    this.$axios.$delete(urlDelete).then((response) => {
      this.$axios.$post(urlAddCart, {
        data: cart
      }).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message)
          context.dispatch('getCart')
        } else {
          this.$bus.$emit('message:push', '新增失敗', 'text-danger')
        }
        context.commit('LOADING', false, {
          root: true
        })
      })
    })
  },
  addToCart (context, {
    id,
    qty
  }) {
    if (context.state.cart.carts.length >= 9 && qty !== -1) {
      this.$bus.$emit('message:push', '購物車已滿', 'text-danger')

      return
    }

    const repeatItem = context.state.cart.carts.find((item) => {
      return item.product_id === id
    })
    if (repeatItem) {
      if (repeatItem.qty === process.env.VUE_APP_MAX_QTY || repeatItem.qty + qty > process.env.VUE_APP_MAX_QTY) {
        this.$bus.$emit('message:push', '產品已達購買上限', 'text-danger')
        return
      }
      if (qty === -1 && repeatItem.qty === 1) {
        context.dispatch('deleteCart', repeatItem.id)
        return
      }
      const newQty = repeatItem.qty + qty
      const cart = {
        product_id: id,
        qty: newQty
      }
      const mixCartInfo = {
        id: repeatItem.id,
        cart
      }

      context.dispatch('mixCart', mixCartInfo)
    } else {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADING', true, {
        root: true
      })
      this.$axios.$post(url, {
        data: cart
      }).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message)
          context.dispatch('getCart')
        } else {
          this.$bus.$emit('message:push', '新增失敗', 'text-danger')
        }
        context.commit('LOADING', false, {
          root: true
        })
      })
    }
  }
}

const mutations = {
  CART (state, payload) {
    state.cart = payload
  }
}

const getters = {
  cart (state) {
    return state.cart
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
//     cart: {
//       carts: []
//     }
//   },
//   actions: {
//     getCart (context) {
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
//       context.commit('LOADING', true, {
//         root: true
//       })
//       axios.get(url).then((response) => {
//         if (response.data.success) {
//           context.commit('CART', response.data.data)
//         } else {
//           Vue.prototype.$bus.$emit('message:push', '取得資料錯誤', 'text-danger')
//         }
//         context.commit('LOADING', false, {
//           root: true
//         })
//       })
//     },
//     deleteCart (context, id) {
//       const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
//       context.commit('LOADING', true, {
//         root: true
//       })
//       axios.delete(url).then((response) => {
//         if (response.data.success) {
//           Vue.prototype.$bus.$emit('message:push', response.data.message)
//           context.dispatch('getCart')
//         } else {
//           Vue.prototype.$bus.$emit('message:push', '刪除失敗', 'text-danger')
//         }
//         context.commit('LOADING', false, {
//           root: true
//         })
//       })
//     },
//     mixCart (context, mixCartInfo) {
//       const {
//         id,
//         cart
//       } = mixCartInfo
//       const urlDelete = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
//       const urlAddCart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
//       context.commit('LOADING', true, {
//         root: true
//       })
//       axios.delete(urlDelete).then((response) => {
//         axios.post(urlAddCart, {
//           data: cart
//         }).then((response) => {
//           if (response.data.success) {
//             Vue.prototype.$bus.$emit('message:push', response.data.message)
//             context.dispatch('getCart')
//           } else {
//             Vue.prototype.$bus.$emit('message:push', '新增失敗', 'text-danger')
//           }
//           context.commit('LOADING', false, {
//             root: true
//           })
//         })
//       })
//     },
//     addToCart (context, {
//       id,
//       qty
//     }) {
//       if (context.state.cart.carts.length >= 9 && qty !== -1) {
//         Vue.prototype.$bus.$emit('message:push', '購物車已滿', 'text-danger')

//         return
//       }

//       const repeatItem = context.state.cart.carts.find((item) => {
//         return item.product_id === id
//       })
//       if (repeatItem) {
//         if (repeatItem.qty === process.env.VUE_APP_MAX_QTY || repeatItem.qty + qty > process.env.VUE_APP_MAX_QTY) {
//           Vue.prototype.$bus.$emit('message:push', '產品已達購買上限', 'text-danger')
//           return
//         }
//         if (qty === -1 && repeatItem.qty === 1) {
//           context.dispatch('deleteCart', repeatItem.id)
//           return
//         }
//         const newQty = repeatItem.qty + qty
//         const cart = {
//           product_id: id,
//           qty: newQty
//         }
//         const mixCartInfo = {
//           id: repeatItem.id,
//           cart
//         }

//         context.dispatch('mixCart', mixCartInfo)
//       } else {
//         const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
//         const cart = {
//           product_id: id,
//           qty
//         }
//         context.commit('LOADING', true, {
//           root: true
//         })
//         axios.post(url, {
//           data: cart
//         }).then((response) => {
//           if (response.data.success) {
//             Vue.prototype.$bus.$emit('message:push', response.data.message)
//             context.dispatch('getCart')
//           } else {
//             Vue.prototype.$bus.$emit('message:push', '新增失敗', 'text-danger')
//           }
//           context.commit('LOADING', false, {
//             root: true
//           })
//         })
//       }
//     }
//   },
//   mutations: {
//     CART (state, payload) {
//       state.cart = payload
//     }
//   },
//   getters: {
//     cart (state) {
//       return state.cart
//     }
//   }
// }
