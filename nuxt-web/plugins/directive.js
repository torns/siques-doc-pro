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

    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
    // eslint-disable-next-line
  }
})

Vue.directive('draggable', {
  inserted(el, binding, vnode) {
    const _el = el
    const ref = vnode.context.$refs[binding.value]
    const mgl = _el.offsetLeft
    const mgt = _el.offsetTop
    const maxWidth = ref.clientWidth
    const maxHeight = ref.clientHeight
    // 尺寸变化的元素的初始宽度
    const elWidth = _el.clientWidth
    const elHeight = _el.clientHeight

    ref.onmousedown = (e) => {
      // 鼠标相对元素的距离

      let disX = e.offsetX

      document.onmousemove = (e) => {
        let left = e.clientX - mgl - maxWidth / 2

        // _el.style.width = left + 'px'
        // vnode.elm.parentElement.parentNode.__vue__._data.width = left + 'px'
        vnode.context.width = left + 'px'
        // vnode.elm.__vue__.width = left + 'px'
        // ref.style.left = e.clientX - elWidth - mgl - maxWidth / 2 + 'px'

        document.onmouseup = (e) => {
          if (left < 199) {
            vnode.context.canHover = true
            left = 10
          } else {
            vnode.context.canHover = false
          }
          vnode.context.width = left + 'px'
          ref.onmousemove = null
          el.onmousemove = null
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
})
