import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import { required, email, digits } from 'vee-validate/dist/rules'
import TW from '@/assets/validate/zh_TW.json'

extend('required', required)
extend('email', email)
extend('digits', digits)
extend('numberLength', (value) => {
  if (value.length === 10) {
    return true
  }
  return '手機號碼必須為10碼'
})
extend('phone', (value) => {
  const num = value.split('')
  if (num[0] === '0' || num[1] === '9') {
    return true
  }
  return '請輸入正確的手機格式'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('zh_TW', TW)
