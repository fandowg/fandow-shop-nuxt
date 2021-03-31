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
<style>
/* html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
</style>
