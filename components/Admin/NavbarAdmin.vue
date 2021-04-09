<template>
  <nav class="navbar bg-white">
    <button
      class="desk-hide-md button-none"
      @click="menuShow = !menuShow"
    >
      <img src="@/assets/images/icon_bars.svg">
    </button>
    <nuxt-link
      class="logo"
      to="/"
    >
      <img
        src="@/assets/images/logo.svg"
        alt="CAMELBAK"
      >
    </nuxt-link>
    <div class="menu menu--left off-canvas" :class="{ active: menuShow }">
      <button
        class="close-position desk-hide-md button-none"
        @click="menuShow = false"
      >
        <img src="@/assets/images/icon_close.svg">
      </button>
      <ul class="menu__list">
        <li class="menu__item">
          <nuxt-link
            class="menu__link"
            to="/admin/products"
          >
            產品管理
          </nuxt-link>
        </li>
        <li class="menu__item">
          <nuxt-link
            class="menu__link"
            to="/admin/coupons"
          >
            優惠券管理
          </nuxt-link>
        </li>
        <li class="menu__item">
          <nuxt-link
            class="menu__link"
            to="/admin/orderlist"
          >
            訂單列表
          </nuxt-link>
        </li>
        <li class="menu__item">
          <nuxt-link
            class="menu__link"
            to="/product-list"
          >
            進入商城
          </nuxt-link>
        </li>
      </ul>
    </div>
    <ul class="menu__list menu__list--mobile-top">
      <li class="menu__item">
        <button class="menu__link" @click="logOut">
          <i class="fas fa-sign-out-alt" />
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  watch: {
    $route () {
      this.menuShow = false
    }
  },
  methods: {
    logOut () {
      const url = `${process.env.VUE_APP_APIPATH}/logout`
      this.$store.commit('LOADING', true)
      this.$axios.post(url).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message)
          this.$router.push('/')
        }
        this.$store.commit('LOADING', false)
      })
    }
  }
}
</script>
