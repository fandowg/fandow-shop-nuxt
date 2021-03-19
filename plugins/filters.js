import Vue from 'vue'

const date = (time) => {
  return new Date(time * 1000).toLocaleDateString()
}

const currency = (num) => {
  const n = Number(num)
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
    return currency
  })}`
}

const categoryChangeCn = (name) => {
  switch (name) {
    case 'straw':
      return '吸管水瓶'

    case 'sport':
      return '運動水瓶'

    case 'kid':
      return '兒童水瓶'

    case 'stainless-steel':
      return '不鏽鋼水瓶'
  }
}

Vue.filter('date', date)
Vue.filter('currency', currency)
Vue.filter('categoryChangeCn', categoryChangeCn)
