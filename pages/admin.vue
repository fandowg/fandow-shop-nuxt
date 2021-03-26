<template>
  <div>
    <NavbarAdmin />
    <main class="container-xl page page--pt">
      <nuxt-child />
    </main>
  </div>
</template>
<script>
import NavbarAdmin from '@/components/Admin/NavbarAdmin.vue'
export default {
  components: {
    NavbarAdmin
  },
  // middleware: 'redirect',
  data () {
    return {}
  }
}
</script>
