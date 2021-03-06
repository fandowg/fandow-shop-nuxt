import Vue from 'vue'
const scrollObserves = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__fadeIn')
      observer.unobserve(entry.target)
    }
  })
})

Vue.directive('scrollanimate', {
  bind (el) {
    el.classList.add('animate__animated')
    el.style.opacity = '0'
    scrollObserves.observe(el)
  }
})
