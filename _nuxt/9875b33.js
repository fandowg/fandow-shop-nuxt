(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{311:function(t,e,r){"use strict";r.r(e);var n=r(6),c=(r(45),r(60),r(27),r(46),{asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,c,o,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$axios,n=t.params,c=t.store,o="".concat("https://vue-course-api.hexschool.io","/api/").concat("fandow","/product/").concat(n.id),c.commit("LOADING",!0,{root:!0}),e.next=5,r.get(o);case 5:return d=e.sent,c.commit("LOADING",!1,{root:!0}),e.abrupt("return",{product:d.data.product});case 8:case"end":return e.stop()}}),e)})))()},data:function(){return{qty:1}},head:function(){return{title:"".concat(this.product.title,"| CAMELBAK水瓶"),meta:[{hid:"og:title",property:"og:title",content:"".concat(this.product.title,"| CAMELBAK水瓶")},{hid:"description",name:"description",content:this.product.description},{hid:"og:description",property:"og:description",content:this.product.description}]}},computed:{product_id:function(){return this.$route.params.id},category:function(){return this.$route.params.category}},watch:{product_id:function(){this.getProductItem()}},created:function(){},methods:{addToCart:function(t,e){this.$store.dispatch("cartModule/addToCart",{id:t,qty:e})}}}),o=r(19),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("main",{staticClass:"page"},[r("nav",{attrs:{"aria-label":"breadcrumb"}},[r("ol",{staticClass:"breadcrumb"},[r("li",{staticClass:"breadcrumb__item"},[r("nuxt-link",{attrs:{to:"/"}},[r("i",{staticClass:"fas fa-home"})])],1),t._v(" "),r("li",{staticClass:"breadcrumb__item"},[r("nuxt-link",{attrs:{to:"/product-list"}},[t._v("\n          購買水瓶\n        ")])],1),t._v(" "),r("li",{staticClass:"breadcrumb__item"},[r("nuxt-link",{attrs:{to:{name:"product-list-category",params:{category:t.category}}}},[t._v("\n          "+t._s(t._f("categoryChangeCn")(t.category))+"\n        ")])],1),t._v(" "),r("li",{staticClass:"breadcrumb__item active",attrs:{"aria-current":"page"}},[t._v("\n        "+t._s(t.product.title)+"\n      ")])])]),t._v(" "),r("div",{directives:[{name:"scrollanimate",rawName:"v-scrollanimate"}],staticClass:"detail container-xl"},[r("div",{staticClass:"detail__top bag-row"},[r("div",{staticClass:"bag-md-5 detail__img"},[r("img",{attrs:{src:t.product.imageUrl,alt:t.product.title}})]),t._v(" "),r("div",{staticClass:"bag-md-7 detail__info"},[r("span",{staticClass:"detail__category"},[t._v(t._s(t._f("categoryChangeCn")(t.product.category)))]),t._v(" "),r("h1",{staticClass:"detail__title"},[t._v("\n          "+t._s(t.product.title)+"\n        ")]),t._v(" "),r("h2",{staticClass:"detail__title__sm"},[t._v("\n          產品特色\n        ")]),t._v(" "),r("p",[t._v(t._s(t.product.description))]),t._v(" "),r("h5",{staticClass:"product__origin_price"},[t._v("\n          NT$"+t._s(t.product.origin_price)+"\n        ")]),t._v(" "),r("h5",{staticClass:"product__price"},[t._v("\n          NT$"+t._s(t.product.price)+"\n        ")]),t._v(" "),r("div",{staticClass:"input-group detail__qty"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.qty,expression:"qty"}],staticClass:"form-control",attrs:{id:"qty",name:"qty"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.qty=e.target.multiple?r:r[0]}}},t._l(5,(function(e){return r("option",{key:e,domProps:{value:e}},[t._v("\n              "+t._s(e)+"\n            ")])})),0),t._v(" "),r("button",{staticClass:"btn btn-primary",on:{click:function(e){return t.addToCart(t.product_id,t.qty)}}},[t._v("\n            加到購物車\n          ")])])])]),t._v(" "),r("div",{staticClass:"detail__content"},[r("h2",{staticClass:"detail__title__sm"},[t._v("\n        產品介紹\n      ")]),t._v(" "),r("div",{staticClass:"detail__text"},[r("span",{domProps:{innerHTML:t._s(t.product.content)}})])])])])}),[],!1,null,"2115741e",null);e.default=component.exports}}]);