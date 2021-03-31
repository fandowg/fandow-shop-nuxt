<template>
  <main class="page">
    <div class="container-xl">
      <div class="product-top">
        <div class="bag-row no-gutters">
          <div class="bag-md-2 bag-4">
            <img src="@/assets/images/feature.jpg" alt="領取折扣，一起加油">
          </div>
          <div class="bag-md-10 bag-8 product-top__content">
            <h2 class="product-top__title">
              領取折扣，一起加油
            </h2>
            <p class="product-top__text">
              結帳輸入 <span class="product-top__text__sp">needwater</span>，<br>全品項 8 折優惠<span
                class="mobile-hide-md"
              >，CAMELBAK 支持你的每個決定</span>。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-xl">
      <div class="menu-block">
        <div ref="navMenu" class="nav-menu">
          <ul class="nav-menu__box">
            <li class="nav-menu__item">
              <nuxt-link
                class="nav-menu__link"
                :class="{ active: currentCategory === 'all' }"
                :to="{
                  name: 'product-list-category',
                  params: { category: 'all', page: 1 },
                }"
              >
                所有水瓶
              </nuxt-link>
            </li>
            <li v-for="item in categories" :key="item" class="nav-menu__item">
              <nuxt-link
                class="nav-menu__link"
                :class="{ active: currentCategory === item }"
                :to="{
                  name: 'product-list-category',
                  params: { category: item },
                }"
              >
                {{ item | categoryChangeCn }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="side-box">
          <select id="sort" v-model="sort" class="form-control" name="sort">
            <option value="" disabled>
              價格排序
            </option>
            <option value="priceUp">
              價格高到低
            </option>
            <option value="priceDown">
              價格低到高
            </option>
          </select>
          <div class="search">
            <input
              id="search"
              v-model="search"
              type="text"
              class="form-control"
              placeholder="搜尋本分類"
            >
            <label for="search"><i class="fas fa-search" /></label>
          </div>
        </div>
      </div>

      <ul class="product bag-row">
        <li
          v-for="item in productsByPage[currentPage]"
          :key="item.id"
          class="product__item bag-lg-3 bag-sm-4 bag-6 animate__fadeIn"
          :class="{ animate__animated: isShow }"
          @click="toProductItem(item.category, item.id)"
        >
          <div class="product__img">
            <img :src="item.imageUrl" :alt="item.title">
          </div>
          <div class="product__content">
            <h3 class="product__title">
              {{ item.title }}
            </h3>
            <div class="product__bottom">
              <div>
                <h5 class="product__origin_price">
                  NT${{ item.origin_price }}
                </h5>
                <h5 class="product__price">
                  NT${{ item.price }}
                </h5>
              </div>
              <button
                class="product__addToCart btn btn-sm btn-primary"
                @click.stop="addToCart(item.id, 1)"
              >
                <i class="fas fa-cart-plus" />
              </button>
            </div>
          </div>
        </li>
      </ul>
      <Page
        ref="page"

        :current-page.sync="currentPage"
        :page-items.sync="pageItems"
        :total-page.sync="totalPage"
      />
      <!-- <nuxt-child /> -->
    </div>
  </main>
</template>
<script>
import Page from '@/components/Pagination.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Page
  },
  async asyncData ({ store }) {
    await store.dispatch('productsModule/getProductsAll')
    // console.log(store.state.productsModule.productsAll)
    console.log(store.state.productsModule.productsAll)
    return { productsAll: store.state.productsModule.productsAll }
  },
  data () {
    return {
      scrollPosition: 0,
      productsByPage: [],
      currentPage: 0,
      pageItems: 12,
      totalPage: 0,
      search: '',
      sort: '',
      isShow: false
    }
  },
  // async fetch ({ store, params }) {
  //   const response = await store.dispatch('productsModule/getProductsAll')
  //   console.log(response)
  // },
  head () {
    return {
      title: `${this.$options.filters.categoryChangeCn(this.currentCategory)} | CAMELBAK水瓶`,
      meta: [
        { hid: 'og:title', property: 'og:title', content: `${this.$options.filters.categoryChangeCn(this.currentCategory)} | CAMELBAK水瓶` },
        { hid: 'description', name: 'description', content: '多種功能水瓶隨你挑選，全產品不含環境賀爾蒙 BPA，通過層層檢驗，讓你買得安心、用得放心，我們的目標是 "幫助人們不再使用一次性的瓶裝水"，為環保和永續發展盡一份力。' },
        { hid: 'og:description', property: 'og:description', content: '多種功能水瓶隨你挑選，全產品不含環境賀爾蒙 BPA，通過層層檢驗，讓你買得安心、用得放心，我們的目標是 "幫助人們不再使用一次性的瓶裝水"，為環保和永續發展盡一份力。' }
      ]
    }
  },

  computed: {
    currentCategory () {
      return this.$route.params.category
    },
    filterProducts () {
      if (this.currentCategory === 'all') {
        if (this.search === '') {
          if (this.sort === '') {
            return this.productsAll
          } else {
            return this.changeSort(this.productsAll)
          }
        } else {
          const filter = this.filterSearch(this.productsAll)
          if (this.sort === '') {
            return filter
          } else {
            return this.changeSort(filter)
          }
        }
      } else {
        const resault = this.productsAll.filter((item) => {
          return item.category === this.currentCategory
        })
        if (this.search === '') {
          if (this.sort === '') {
            return resault
          } else {
            return this.changeSort(resault)
          }
        } else {
          const filter = this.filterSearch(resault)
          if (this.sort === '') {
            return filter
          } else {
            return this.changeSort(filter)
          }
        }
      }
    },
    ...mapGetters('productsModule', ['categories']),
    ...mapGetters(['width'])
  },
  watch: {
    $route () {
      this.scrollToRight()
    },
    search () {
      this.currentPage = 0
    },
    currentCategory () {
      this.currentPage = 0
      this.itemShow()
    },
    filterProducts (val) {
      this.createPage(this.filterProducts)
      // this.$refs.page.createPage(this.filterProducts)
    },
    currentPage () {
      this.toTop()
      this.itemShow()
    },
    productsAll () {
      setTimeout(this.scrollToRight, 0)
    }
  },
  created () {
    this.createPage(this.filterProducts)
    // console.log(this.$refs.page)
    // this.$refs.page.createPage(this.getProductsAll)
    // this.getProductsAll()
  },
  methods: {
    itemShow () {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 1000)
    },
    getProductsByPage (products) {
      this.productsByPage = products
    },
    changeSort (products) {
      this.currentPage = 0
      let newSort = []
      const newProducts = [...products]
      // eslint-disable-next-line array-callback-return
      newSort = newProducts.sort((a, b) => {
        const aPrice = a.price ? a.price : a.origin_price
        const bPrice = b.price ? b.price : b.origin_price
        switch (this.sort) {
          case 'priceUp':
            return bPrice - aPrice
          case 'priceDown':
            return aPrice - bPrice
        }
      })
      return newSort
    },
    filterSearch (resault) {
      return resault.filter((item) => {
        return item.title.includes(this.search)
      })
    },
    createPage (products) {
      console.log(products)
      const newProducts = []
      let pagArray = []
      const obKey = Object.keys(products)
      obKey.forEach((item, index) => {
        pagArray.push(products[item])
        if (index !== 0 && (index + 1) % this.pageItems === 0) {
          newProducts.push(pagArray)
          pagArray = []
        }
        if (index + 1 === obKey.length && obKey.length % this.pageItems !== 0) {
          newProducts.push(pagArray)
        }
      })
      console.log(newProducts)
      this.totalPage = newProducts.length
      this.productsByPage = newProducts
      // this.$emit('products-by-page', newProducts)
    },
    // createPage () {
    //   this.$refs.page.createPage(this.getProductsAll)
    // },
    ...mapActions('productsModule', ['getProductsAll']),
    toProductItem (category, id) {
      this.$router.push({
        name: 'product-list-category-id',
        params: {
          category,
          id
        }
      })
    },
    addToCart (id, qty) {
      this.$store.dispatch('cartModule/addToCart', { id, qty })
    },
    toTop () {
      document.documentElement.scrollTop = 0
    },
    scrollToRight () {
      if (this.width < 576) {
        if (
          this.currentCategory === 'kid' ||
          this.currentCategory === 'stainless-steel'
        ) {
          this.$refs.navMenu.scrollLeft = this.$refs.navMenu.offsetWidth
        } else {
          this.$refs.navMenu.scrollLeft = 0
        }
      }
    }
  }

}
</script>
<style lang="scss" scoped></style>
