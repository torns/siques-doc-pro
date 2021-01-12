import Vue from 'vue'

Vue.directive('highlight', {
  inserted(el) {
    /* eslint-disable */
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
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

      if (e.srcElement.className.indexOf('open') == -1) {
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
              left = 0
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
  }
})

//指令
Vue.directive('drag', function(el, binding) {
  el.onmousedown = function(e) {
    var divx = e.clientX
    var divy = e.clientY

    //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
    var layx = e.layerX
    var layy = e.layerY
    el.style.transition = 0 + 's'
    document.onmousemove = function(e) {
      //获取移动后div的位置：鼠标位置-divx/divy

      var l = e.clientX - layx
      var t = e.clientY - layy

      el.style.left = l + 'px'
      el.style.top = t + 'px'
    }
    document.onmouseup = function(e) {
      if (binding.value == 'left') {
        setTimeout(() => {
          el.style.left = 1 + 'px'
        }, 200)
      }

      el.style.transition = 1 + 's'
      document.onmousemove = null
      document.onmouseup = null
    }
  }
})
