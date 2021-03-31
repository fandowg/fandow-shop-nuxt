<template>
  <div>
    <NavbarAdmin />
    <main class="container-xl page page--pt">
      <client-only>
        <nuxt-child />
      </client-only>
    </main>
  </div>
</template>
<script>
import NavbarAdmin from '@/components/Admin/NavbarAdmin.vue'
export default {
  components: {
    NavbarAdmin
  },
  // middleware: 'requiresAuth',
  // meta: {
  //   requiresAuth: true
  // },
  data () {
    return {}
  },
  // middleware: 'redirect',
  created () {
    if (process.client) {
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line nuxt/no-globals-in-created
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      console.log(myCookie)
      this.$axios.defaults.headers.common.Authorization = myCookie
    }
  }
}
</script>
