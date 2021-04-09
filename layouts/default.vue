<template>
  <div>
    <Alert />

    <client-only>
      <Loading
        :active.sync="isLoading"
        color="#000"
        loader="spinner"
        background-color="#fff"
      />
    </client-only>

    <Navbar v-if="isShow" />

    <Nuxt />

    <Footer v-if="isShow" />
    <a
      class="to-top-btn"
      :class="{ show: scrollPosition > 100 }"
      @click.prevent="toTop"
    ><img
      src="@/assets/images/totop.svg"
    ></a>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'
export default {
  components: {
    Navbar,
    Footer,
    Alert
  },
  data () {
    return {
      scrollPosition: 0,
      isShow: true
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (val) {
        const check = val.path.indexOf('admin')
        if (check !== -1) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.pageYOffset
    })
    this.$store.dispatch('watchResize')
  },
  methods: {
    toTop () {
      let top = document.documentElement.scrollTop
      const toTop = setInterval(() => {
        document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(toTop)
        }
      }, 10)
    }
  }
}
</script>
