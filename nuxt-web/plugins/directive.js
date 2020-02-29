import Vue from 'vue'
Vue.directive('focus', {
  inserted(el) {
    // 获得原生输入框
    el.getElementsByTagName('input')[0].focus()
  },

  componentUpdated(el, binding) {
    el.getElementsByTagName('input')[0].focus()
  }
})
Vue.directive('highlight', {
  inserted(el) {
    /* eslint-disable */

    // const blocks = el.querySelectorAll('pre code')

    // eslint-disable-next-line

    hljs.initHighlighting()
  }
})
