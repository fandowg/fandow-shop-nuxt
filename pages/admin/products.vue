<template>
  <div>
    <EditProduct
      :is-new="isNew"
      :temp-product="tempProduct"
      @close="closeModal"
      @get-products="getProducts"
    />
    <v-dialog />
    <div class="menu-block menu-block--inline">
      <h1 class="page__title">
        產品列表
      </h1>
      <button class="btn btn-primary" @click="openModal(true)">
        新增產品
      </button>
    </div>

    <div class="admin">
      <div class="admin__head bag-row no-gutters">
        <div class="admin__item bag-md text-center">
          圖片
        </div>
        <div class="admin__item admin__title bag-md-4">
          產品名稱
        </div>
        <div class="admin__item bag-md">
          分類
        </div>
        <div class="admin__item bag-md">
          原價
        </div>
        <div class="admin__item bag-md">
          售價
        </div>
        <div class="admin__item bag-md text-right-max-md">
          啟用
        </div>
        <div class="admin__item bag-md text-right-min-md">
          編輯
        </div>
        <div class="admin__item bag-md text-right">
          刪除
        </div>
      </div>
      <div class="admin__list">
        <div
          v-for="item in products[currentPage]"
          :key="item.id"
          class="admin__row bag-row no-gutters"
        >
          <div class="admin__item bag-md bag-2 text-center">
            <img :src="item.imageUrl" alt="item.title">
          </div>

          <div class="admin__item admin__title bag-md-4 bag-10">
            {{ item.title }}
          </div>
          <div class="admin__item bag-md bag-3">
            {{ item.category | categoryChangeCn }}
          </div>
          <div class="admin__item bag-md bag-3 price">
            <span class="desk-hide-md">原價</span>{{ item.origin_price }}
          </div>
          <div class="admin__item bag-md bag-3 origin_price">
            <span class="desk-hide-md">特價</span>{{ item.price }}
          </div>
          <div class="admin__item bag-md bag-3 text-right-max-md">
            <span v-if="item.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </div>
          <div class="admin__item bag-md bag-6 text-right-min-md">
            <button
              class="btn btn-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
          </div>
          <div class="admin__item bag-md bag-6 text-right">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="deleteProduct(item.id, item)"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <Page
      ref="page"

      :current-page.sync="currentPage"
      :page-items.sync="pageItems"
      :total-page.sync="totalPage"
    />
  </div>
</template>
<script>
import EditProduct from '@/components/Admin/EditProduct.vue'
import Page from '@/components/Pagination.vue'
export default {
  components: {
    EditProduct,
    Page
  },
  middleware: 'requiresAuth',
  meta: {
    requiresAuth: true
  },
  data () {
    return {
      products: {},
      tempProduct: {},

      isNew: true,
      currentPage: 0,
      pageItems: 12,
      totalPage: 0
    }
  },
  watch: {
    currentPage () {
      this.toTop()
    }
  },
  created () {
    this.getProducts(1)
    console.log(123)
  },
  methods: {
    getProducts (page = 1) {
      console.log(123)
      this.$store.commit('LOADING', true)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`
      console.log(url)
      this.$axios.get(url).then((response) => {
        if (response.data.success) {
          console.log(response.data)
          this.products = response.data.products
          const newProducts = []
          let pagArray = []
          const obKey = Object.keys(this.products)
          obKey.forEach((item, index) => {
            pagArray.push(this.products[item])
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
          this.products = newProducts

          // this.$refs.page.createPage(response.data.products)
        } else {
          console.log(response.data)
        }
        this.$store.commit('LOADING', false)
      })
    },
    deleteProduct (id, item) {
      this.$modal.show('dialog', {
        text: `確定要刪除<br>「${item.title}」嗎？`,
        buttons: [
          {
            title: '取消',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: '確定',
            handler: () => {
              const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`
              this.$store.commit('LOADING', true)
              this.$axios.delete(url).then((response) => {
                if (response.data.success) {
                  this.$bus.$emit('message:push', response.data.message)

                  this.getProducts()
                } else {
                  this.$bus.$emit(
                    'message:push',
                    response.data.message,
                    'text-danger'
                  )
                }
                this.$modal.hide('dialog')
                this.$store.commit('LOADING', false)
              })
            }
          }
        ]
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {
          is_enabled: 0,
          category: 'default'
        }
        this.isNew = isNew
      } else {
        this.tempProduct = item
        this.isNew = isNew
      }

      this.$modal.show('editProduct')
    },
    closeModal () {
      this.$modal.hide('editProduct')
    },
    toTop () {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
