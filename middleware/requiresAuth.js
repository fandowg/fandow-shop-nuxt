import Vue from 'vue'
// import axios from 'axios'
export default ({ route, redirect, $axios }) => {
  console.log(route)
  if (route.meta[1].requiresAuth) {
    const url = `${process.env.VUE_APP_APIPATH}/api/user/check`
    $axios.post(url).then((response) => {
      if (response.data.success) {
        console.log(response.data)
        // next()
      } else {
        Vue.prototype.$bus.$emit('message:push', response.data.message, 'text-danger')
        return redirect('/login')
      }
    })
  } else {
    // next()
  }
}

// export default (context) => {
//   console.log(context)
// }
