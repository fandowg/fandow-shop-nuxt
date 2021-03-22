import Vue from 'vue'
Vue.prototype.$bus = new Vue()
// import Vue from 'vue'

// const bus = {}

// bus.install = function (Vue) {
//   Vue.prototype.$bus = new Vue()
// }

// Vue.use(bus)
// https://www.jianshu.com/p/18b95611a31c

// 插件可以通過 Vue.use() 方法來使用，亦可在後方傳入參數，不過須在 new Vue() 之前調用才有效
// 插件應該對外暴露一個 install 的方法，Vue.use() 則會去調用這個方法，第一個參數是 Vue 的建構式，第二個參數則是剛剛傳入的東西，而插件內可做的操作如下：
// https://ithelp.ithome.com.tw/articles/10231538
