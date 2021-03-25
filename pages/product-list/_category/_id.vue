<template>
  <main class="page">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb__item">
          <router-link to="/">
            <i class="fas fa-home" />
          </router-link>
        </li>
        <li class="breadcrumb__item">
          <router-link to="/product-list">
            購買水瓶
          </router-link>
        </li>
        <li class="breadcrumb__item">
          <router-link
            :to="{ name: 'product-list-category', params: { category } }"
          >
            {{ category | categoryChangeCn }}
          </router-link>
        </li>
        <li class="breadcrumb__item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div v-scrollanimate class="detail container-xl">
      <div class="detail__top bag-row">
        <div class="bag-md-5 detail__img">
          <img :src="product.imageUrl" :alt="product.title">
        </div>
        <div class="bag-md-7 detail__info">
          <span class="detail__category">{{
            product.category | categoryChangeCn
          }}</span>
          <h1 class="detail__title">
            {{ product.title }}
          </h1>
          <h2 class="detail__title__sm">
            產品特色
          </h2>
          <p>{{ product.description }}</p>
          <h5 class="product__origin_price">
            NT${{ product.origin_price }}
          </h5>
          <h5 class="product__price">
            NT${{ product.price }}
          </h5>
          <div class="input-group detail__qty">
            <select id="qty" v-model="qty" name="qty" class="form-control">
              <option v-for="num in 5" :key="num" :value="num">
                {{ num }}
              </option>
            </select>
            <button class="btn btn-primary" @click="addToCart(product_id, qty)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
      <div class="detail__content">
        <h2 class="detail__title__sm">
          產品介紹
        </h2>
        <div class="detail__text">
          <span v-html="product.content" />
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  computed: {
    product_id () {
      return this.$route.params.id
    },
    category () {
      return this.$route.params.category
    }
  },
  watch: {
    product_id () {
      this.getProductItem()
    }
  },
  created () {
    this.getProductItem()
  },
  methods: {
    getProductItem () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.product_id}`
      this.$store.commit('LOADING', true)
      this.$axios.get(url).then((response) => {
        if (response.data.success) {
          this.product = response.data.product
        } else {
          this.$bus.$emit('message:push', response.data.message, 'text-danger')
        }
        this.$store.commit('LOADING', false)
      })
    },
    addToCart (id, qty) {
      this.$store.dispatch('cart/addToCart', { id, qty })
    }
  }
}
</script>
