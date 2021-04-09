<template>
  <div>
    <client-only>
      <v-dialog />
    </client-only>
    <h2 class="page__title--sm">
      商品明細
    </h2>
    <div class="cart no-delete">
      <div class="cart__head bag-row no-gutters">
        <div class="cart__item">
          產品
        </div>
        <div class="cart__item">
          數量
        </div>
        <div class="cart__item">
          價格
        </div>
      </div>
      <div class="cart__list">
        <div
          v-for="item in cart.carts"
          :key="item.id"
          class="cart__row bag-row no-gutters"
        >
          <div class="cart__item bag-3 bag-md-2 cart__img">
            <img :src="item.product.imageUrl" alt="item.product.title">
          </div>
          <div class="bag-7 bag-md-8 bag-row no-gutters cart__group">
            <div class="cart__item cart__title bag-md-8">
              {{ item.product.title }}
            </div>
            <div class="cart__item cart__num bag-md-4">
              <span
                class="cart__num__content no-padding"
              >{{ item.qty }}{{ item.product.unit }}</span>
            </div>
          </div>
          <div class="bag cart__item cart__price">
            {{ item.final_total | currency }}
          </div>
        </div>
      </div>
      <div class="cart__bottom">
        <div class="cart__total">
          <div v-if="cart.total !== cart.final_total" class="cart__total__row">
            <span class="cart__total__row__title">總額：</span>
            <span class="cart__total__row__content">
              {{ cart.total | currency }}</span>
          </div>
          <div v-if="cart.total !== cart.final_total" class="cart__total__row">
            <span class="cart__total__row__title">折扣：</span>
            <span class="cart__total__row__content text-success">
              {{ (cart.total - cart.final_total) | currency }}
            </span>
          </div>
          <div class="cart__total__row">
            <span class="cart__total__row__title">應付：</span>
            <span class="cart__total__row__content text-danger">
              {{ cart.final_total | currency }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-box-end">
      <h2 class="page__title--sm">
        填寫資料
      </h2><h4 class="text-tip-in-title text-danger">
        * 為必填
      </h4>
    </div>
    <client-only>
      <ValidationObserver v-slot="{ handleSubmit,invalid }">
        <div class="form order">
          <div class="form-row">
            <div class="bag-md-6 form-group">
              <ValidationProvider
                v-slot="{ failed, passed, errors }"
                name="姓名"
                rules="required"
              >
                <label for="name">姓名 *</label>
                <input
                  id="name"
                  v-model="user.name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': failed, 'is-valid': passed }"
                  placeholder="請輸入姓名"
                >
                <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="bag-md-6 form-group">
              <ValidationProvider
                v-slot="{ failed, passed, errors }"
                name="手機"
                rules="required|phone|numberLength"
              >
                <label for="phone">手機 *</label>
                <input
                  id="phone"
                  v-model="user.tel"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': failed, 'is-valid': passed }"
                  maxlength="10"
                  placeholder="請輸入手機號碼"
                >
                <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group">
            <ValidationProvider
              v-slot="{ failed, passed, errors }"
              name="email"
              rules="required|email"
            >
              <label for="email">email *</label>
              <input
                id="email"
                v-model="user.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': failed, 'is-valid': passed }"
                placeholder="請輸入mail"
              >
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group-wrapper">
            <label for="address">收件人地址 *</label>
            <div class="form-row">
              <div class="bag-md-3 bag-6 form-group">
                <ValidationProvider
                  v-slot="{ failed, passed, errors }"
                  name="縣市"
                  rules="required"
                >
                  <select
                    id="city"
                    v-model="city"
                    class="form-control"
                    :class="{ 'is-invalid': failed, 'is-valid': passed }"
                    name="city"
                  >
                    <option :value="null" selected disabled>
                      請選擇縣市
                    </option>
                    <option
                      v-for="item in postal"
                      :key="item.name"
                      :value="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="bag-md-3 bag-6 form-group">
                <ValidationProvider
                  v-slot="{ failed, passed, errors }"
                  name="鄉政市區"
                  rules="required"
                >
                  <select
                    id="area"
                    v-model="area"
                    class="form-control"
                    :class="{ 'is-invalid': failed, 'is-valid': passed }"
                    name="area"
                  >
                    <option :value="{}" selected disabled>
                      請選擇區域
                    </option>
                    <option
                      v-for="item in areaArray"
                      :key="item.name"
                      :value="item"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="bag-md-6 form-group">
                <ValidationProvider
                  v-slot="{ failed, passed, errors }"
                  name="收件人地址"
                  rules="required"
                >
                  <input
                    id="address"
                    v-model="addressText"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': failed, 'is-valid': passed }"
                    placeholder="請輸入收件人地址"
                  >
                  <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="comment">備註</label>
            <textarea
              id="comment"
              v-model="message"
              class="form-control"
              name="comment"
              rows="4"
            />
          </div>
        </div>
        <div class="btn-wrapper-side">
          <nuxt-link
            class="btn btn-outline-primary"
            to="/check-cart"
          >
            回購物車
          </nuxt-link>
          <button :disabled="invalid" class="btn btn-primary" @click="handleSubmit(createOrder)">
            建立訂單
          </button>
        </div>
      </ValidationObserver>
    </client-only>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import postal from '@/assets/postal.json'
export default {
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'order-payment-id' && this.cart.carts.length !== 0) {
      this.$modal.show('dialog', {
        text: '您的訂單尚未完成，確定要離開嗎？',
        buttons: [
          {
            title: '取消',
            handler: () => {
              this.$modal.hide('dialog')
              next(false)
            }
          },
          {
            title: '確定',
            handler: () => {
              next()
            }
          }
        ]
      })
    } else {
      next()
    }
  },
  data () {
    return {
      user: {},
      postal,
      city: null,
      area: {},
      areaArray: [],
      addressText: '',
      message: ''
    }
  },
  head () {
    return {
      title: '訂單-填寫資料 | CAMELBAK水瓶',
      meta: [
        { hid: 'og:title', property: 'og:title', content: '訂單-填寫資料 | CAMELBAK水瓶' }

      ]
    }
  },
  computed: {
    address () {
      return `${this.area.code} ${this.city} ${this.area.name} ${this.addressText} `
    },
    ...mapGetters('cartModule', ['cart'])
  },
  watch: {
    city () {
      const currentArea = postal.find((item) => {
        return item.name === this.city
      })
      this.areaArray = currentArea ? currentArea.children : []
      this.area = {}
    },
    address (val) {
      this.user.address = val
    },
    cart (val) {
      if (val.carts.length === 0) {
        this.$router.go(-1)
      }
    }
  },
  methods: {
    createOrder () {
      const form = {
        user: this.user,
        message: this.message
      }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      this.$store.commit('LOADING', true)
      this.$axios.post(url, { data: form }).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message)
          this.$router.push({
            name: 'order-payment-id',
            params: {
              id: response.data.orderId
            }
          })
          this.getCart()
        } else {
          this.$bus.$emit('message:push', response.data.message, 'text-danger')
        }
        this.$store.commit('LOADING', false)
      })
    },
    ...mapActions('cartModule', ['getCart'])
  }

}
</script>
