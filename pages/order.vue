<template>
  <main class="page page--pt container-lg">
    <div class="step">
      <ul class="step__list">
        <li class="step__item" :class="{ active: active === 'order-order-info' }">
          <span
            class="step__item__num"
          ><i class="fas fa-angle-double-right" /></span>填寫資料
        </li>
        <li class="step__item" :class="{ active: active === 'order-payment-id' }">
          <span
            class="step__item__num"
          ><i class="fas fa-angle-double-right" /></span>確認付款
        </li>
        <li class="step__item" :class="{ active: active === 'order-order-done-id' }">
          <span
            class="step__item__num"
          ><i class="fas fa-angle-double-right" /></span>訂單完成
        </li>
      </ul>
    </div>

    <nuxt-child />
  </main>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    active () {
      return this.$route.name
    }
  }
}
</script>
