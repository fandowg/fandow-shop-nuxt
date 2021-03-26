<template>
  <div class="page">
    <div class="container-500 only-box-top">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="only-box" @submit.prevent="handleSubmit(signIn)">
          <h1 class="only-box-top__title">
            請先登入
          </h1>

          <div class="form-group">
            <ValidationProvider
              v-slot="{ failed, passed, errors }"
              name="email"
              rules="required|email"
            >
              <label for="email">請輸入email帳號</label>
              <input
                id="email"
                v-model="user.username"
                class="form-control"
                :class="{ 'is-invalid': failed, 'is-valid': passed }"
                type="email"
                placeholder="帳號"
                autofocus
              >
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider
              v-slot="{ failed, passed, errors }"
              name="密碼"
              rules="required"
            >
              <label for="email">請輸入密碼</label>
              <input
                id="password"
                v-model="user.password"
                class="form-control"
                :class="{ 'is-invalid': failed, 'is-valid': passed }"
                type="password"
                placeholder="密碼"
              >
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <button type="submit" class="btn btn-primary btn-full">
            登入
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`
      this.$store.commit('LOADING', true)
      this.$axios.post(url, this.user).then((response) => {
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message)

          this.$router.push('/admin')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'text-danger')
        }
        this.$store.commit('LOADING', false)
      })
    }
  }
}
</script>
