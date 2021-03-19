<template>
  <nav class="navbar" :class="{ 'bg-white': scrollPosition > 50 || checkHome }">
    <button
      class="desk-hide-md button-none"
      @click="menuShow = !menuShow"
    >
      <img src="@/assets/images/icon_bars.svg">
    </button>
    <router-link
      class="logo"
      to="/"
    >
      <img
        src="@/assets/images/logo.svg"
        alt="CAMELBAK"
      >
    </router-link>
    <div class="menu menu--left off-canvas" :class="{ active: menuShow }">
      <button
        class="close-position desk-hide-md button-none"
        @click="menuShow = false"
      >
        <img src="@/assets/images/icon_close.svg">
      </button>
      <ul class="menu__list">
        <li ref="closeDropdown" class="menu__item dropdown">
          <a
            class="menu__link dropdown__btn"
            @click.prevent="toggleDropdown"
          >購買水瓶 <i class="fas fa-chevron-down" /></a>
          <ul
            class="dropdown__box navbar-dropdown"
            :class="{ active: dropdownShow }"
          >
            <li class="dropdown__item">
              <router-link
                class="dropdown__link"
                to="/product-list/all"
                @click.native="closeMenu()"
              >
                所有水瓶
              </router-link>
            </li>
            <li class="dropdown__item">
              <router-link
                class="dropdown__link"
                to="/product-list/straw"
                @click.native="closeMenu()"
              >
                吸管水瓶
              </router-link>
            </li>
            <li class="dropdown__item">
              <router-link
                class="dropdown__link"
                to="/product-list/sport"
                @click.native="closeMenu()"
              >
                運動水瓶
              </router-link>
            </li>
            <li class="dropdown__item">
              <router-link
                class="dropdown__link"
                to="/product-list/kid"
                @click.native="closeMenu()"
              >
                兒童水瓶
              </router-link>
            </li>
            <li class="dropdown__item">
              <router-link
                class="dropdown__link"
                to="/product-list/stainless-steel"
                @click.native="closeMenu()"
              >
                不鏽鋼水瓶
              </router-link>
            </li>
          </ul>
        </li>
        <li class="menu__item">
          <router-link
            class="menu__link"
            to="/about"
            @click.native="closeMenu()"
          >
            深入了解CAMELBAK
          </router-link>
        </li>
      </ul>
    </div>
    <ul class="menu__list menu__list--mobile-top">
      <li class="menu__item">
        <router-link
          class="menu__link"
          to="/admin"
        >
          <i class="fas fa-user" />
        </router-link>
      </li>
      <li ref="closeCart" class="dropdown menu__item">
        <a class="menu__link dropdown__btn" @click.prevent="toggleCart"><i class="fas fa-shopping-cart" /><span v-if="cartLength > 0" class="cart-qty-icon">{{
          cartLength
        }}</span>
        </a>
        <div
          class="dropdown__box dropdown__box--right no-padding"
          :class="{ active: cartShow }"
        >
          <div v-if="cartLength > 0">
            <div class="cart">
              <div class="cart__head bag-row no-gutters">
                <div class="cart__item bag-7">
                  產品
                </div>
                <div class="cart__item bag-2">
                  數量
                </div>
                <div class="cart__item bag-2">
                  價格
                </div>
                <div class="cart__item bag" />
              </div>
              <div class="cart__list">
                <div
                  v-for="item in cart.carts"
                  :key="item.id"
                  class="cart__row bag-row no-gutters"
                >
                  <div class="cart__item bag-7 cart__title">
                    {{ item.product.title }}
                  </div>
                  <div class="cart__item bag-2 cart__num">
                    <span
                      class="cart__num__content no-padding"
                    >{{ item.qty }} {{ item.product.unit }}</span>
                  </div>
                  <div class="cart__item bag-2 cart__price">
                    {{ item.final_total | currency }}
                  </div>
                  <div class="cart__item bag cart__delete">
                    <button class="button-none" @click="deleteCart(item.id)">
                      <i class="fas fa-trash" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-wrapper-side delete-spacer">
              <router-link
                class="btn btn-primary btn-full"
                to="/check-cart"
              >
                前往結帳
              </router-link>
            </div>
          </div>
          <div v-else class="box-default">
            <p>購物車是空的喔，趕快來選購吧</p>
            <router-link
              class="btn btn-primary"
              to="/product-list"
            >
              前往購物
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      menuShow: false,
      dropdownShow: false,
      cartShow: false,
      scrollPosition: 0
    }
  },
  watch: {
    $route () {
      this.menuShow = false
      this.mobileOpenDropdown()
      this.cartShow = false
    },
    width () {
      this.mobileOpenDropdown()
    },
    menuShow (val) {
      if (val) {
        this.dropdownShow = true
      }
    }
  },
  computed: {
    checkHome () {
      return this.$route.name !== 'Home'
    },
    cartLength () {
      return this.cart.carts.length
    },
    ...mapGetters('cart', ['cart']),
    ...mapGetters(['width'])
  },
  methods: {
    toggleDropdown () {
      this.dropdownShow = !this.dropdownShow
      if (this.dropdownShow === true) {
        document.addEventListener('click', this.closeBlankDropdown)
      } else {
        document.removeEventListener('click', this.closeBlankDropdown)
      }
    },
    toggleCart () {
      this.cartShow = !this.cartShow
      if (this.cartShow === true) {
        document.addEventListener('click', this.closeBlankCart)
      } else {
        document.removeEventListener('click', this.closeBlankCart)
      }
    },
    closeBlankDropdown (e) {
      if (!this.$refs.closeDropdown.contains(e.target)) {
        this.dropdownShow = false
        document.removeEventListener('click', this.closeBlankDropdown)
      }
    },
    closeBlankCart (e) {
      if (!this.$refs.closeCart.contains(e.target)) {
        this.cartShow = false
        document.removeEventListener('click', this.closeBlankCart)
      }
    },
    ...mapActions('cart', ['getCart', 'deleteCart']),
    mobileOpenDropdown () {
      if (this.width < 768) {
        this.dropdownShow = true
      } else {
        this.dropdownShow = false
      }
    },
    closeMenu () {
      this.menuShow = false
      this.dropdownShow = false
    }
  },
  created () {
    this.getCart()
  },
  mounted () {
    this.mobileOpenDropdown()
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.pageYOffset
    })
  }
}
</script>
