<template>
  <modal
    name="editProduct"
    :adaptive="true"
    :shift-y="0.3"
    :max-width="800"
    width="95%"
    height="auto"
    :scrollable="true"
  >
    <div class="edit-page">
      <ValidationObserver v-slot="{ handleSubmit }">
        <button class="close-position button-none" @click="$emit('close')">
          <img src="@/assets/images/icon_close.svg">
        </button>
        <h2 class="edit-page__title">
          <span v-if="isNew">新增</span><span v-else>編輯</span>產品
        </h2>
        <div class="edit">
          <div class="edit__item form-group">
            <label>輸入圖片網址</label>
            <input
              v-model="editTemp.imageUrl"
              type="text"
              class="form-control"
            >
          </div>
          <div class="edit__row form-row">
            <div class="edit__item bag-md-9 form-group">
              <label
                style="margin-right: 1rem"
              >或上傳圖片
                <i
                  v-if="loadStatus.upLoadImage"
                  class="fas fa-circle-notch fa-spin"
                /></label>

              <input ref="upImage" type="file" @change="upLoadImage">
            </div>
            <div
              v-if="editTemp.imageUrl"
              class="edit__item bag-md-3 bag-6 form-group"
            >
              <img :src="editTemp.imageUrl" alt>
            </div>
          </div>

          <div class="edit__item form-group">
            <ValidationProvider
              v-slot="{ failed, errors }"
              name="產品名稱"
              rules="required"
            >
              <label for="title">產品名稱</label>
              <input
                id="title"
                v-model="editTemp.title"
                type="text"
                class="form-control"
                placeholder="請輸入產品名稱"
              >

              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="edit__row form-row">
            <div class="edit__item bag-6 form-group">
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="分類"
                rules="required"
              >
                <label for="category">分類</label>
                <select
                  id="category"
                  v-model="editTemp.category"
                  name="category"
                  class="form-control"
                >
                  <option disabled value="null">
                    請選擇
                  </option>
                  <option v-for="item in category" :key="item" :value="item">
                    {{ item | categoryChangeCn }}
                  </option>
                </select>

                <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="edit__item bag-6 form-group">
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="單位"
                rules="required"
              >
                <label for="unit">單位</label>
                <input
                  id="unit"
                  v-model="editTemp.unit"
                  type="text"
                  class="form-control"
                  placeholder="請輸入單位"
                >
                <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="edit__row form-row">
            <div class="edit__item bag-6 form-group">
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="原價"
                rules="required"
              >
                <label for="origin_price">原價</label>
                <input
                  id="origin_price"
                  v-model="editTemp.origin_price"
                  type="number"
                  class="form-control"
                  placeholder="請輸入原價"
                >
                <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="edit__item bag-6 form-group">
              <label for="price">售價</label>
              <input
                id="price"
                v-model="editTemp.price"
                type="number"
                class="form-control"
                placeholder="請輸入售價"
              >
            </div>
          </div>
          <div class="edit__row form-row">
            <div class="edit__item bag-md-6 form-group">
              <label for="description">產品描述</label>
              <textarea
                id="description"
                v-model="editTemp.description"
                class="form-control"
                cols="30"
                rows="6"
                placeholder="請輸入產品描述"
              />
            </div>
            <div class="edit__item bag-md-6 form-group">
              <label for="content">說明內容</label>
              <textarea
                id="content"
                v-model="editTemp.content"
                class="form-control"
                cols="30"
                rows="6"
                placeholder="請輸入說明內容"
              />
            </div>
          </div>
          <div class="edit__row form-row">
            <div class="edit__item bag-6 form-group">
              <div class="form-check">
                <input
                  id="is_enabled"
                  v-model="editTemp.is_enabled"
                  type="checkbox"
                  class="form-check-input"
                  :true-value="1"
                  :false-value="0"
                >
                <label
                  class="form-check-label"
                  for="is_enabled"
                >是否啟用</label>
              </div>
            </div>
            <div class="edit__item bag-6 form-group">
              <div class="form-check">
                <input
                  id="hotProducts"
                  v-model="editTemp.hotProducts"
                  type="checkbox"
                  class="form-check-input"
                  :true-value="1"
                  :false-value="0"
                >
                <label
                  class="form-check-label"
                  for="hotProducts"
                >是否熱銷</label>
              </div>
            </div>
          </div>
          <!-- <button @click="updateProduct">送出</button> -->
          <div class="btn-wrapper-side">
            <button class="btn btn-outline-primary" @click="$emit('close')">
              取消
            </button>
            <button
              class="btn btn-primary"
              @click="handleSubmit(updateProduct)"
            >
              送出
            </button>
          </div>
        </div>
      </ValidationObserver>
    </div>
  </modal>
</template>

<script>
import category from '@/assets/category'
export default {
  props: ['isNew', 'tempProduct'],
  data () {
    return {
      category,
      loadStatus: {
        upLoadImage: false
      },
      editTemp: {}
    }
  },
  watch: {
    tempProduct () {
      this.editTemp = { ...this.tempProduct }
      if (this.isNew) {
        this.editTemp.category = null
      }
    }
  },
  methods: {
    updateProduct () {
      if (this.isNew) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
        this.$store.commit('LOADING', true)
        this.$axios.post(url, { data: this.editTemp }).then((response) => {
          if (response.data.success) {
            this.$bus.$emit('message:push', response.data.message)
            this.$emit('get-products')
          }
          this.$emit('close')
          this.$store.commit('LOADING', false)
        })
      } else {
        if (
          JSON.stringify(this.editTemp) === JSON.stringify(this.tempProduct)
        ) {
          this.$emit('close')
          return
        }
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.editTemp.id}`
        this.$store.commit('LOADING', true)
        this.$axios.put(url, { data: this.editTemp }).then((response) => {
          if (response.data.success) {
            this.$bus.$emit('message:push', response.data.message)

            this.$emit('get-products')
          }
          this.$emit('close')
          this.$store.commit('LOADING', false)
        })
      }
    },
    upLoadImage () {
      const image = this.$refs.upImage.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', image)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.loadStatus.upLoadImage = true
      this.$axios
        .post(url, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.data.success) {
            this.$set(this.editTemp, 'imageUrl', response.data.imageUrl)
          } else {
            this.$bus.$emit(
              'message:push',
              response.data.message,
              'text-danger'
            )
          }
          this.loadStatus.upLoadImage = false
        })
    }
  }
}
</script>
