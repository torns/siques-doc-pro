// import { scrollWithAnimation, Easing } from './animate.js'
/* eslint-disable */
const install = (Vue, options) => {
  if (install.installed) return

  if (typeof window === 'undefined') return

  const bodyScrollEl = {}
  // 监听的元素
  const scrollSpyElements = []
  let activableElements = []

  // 对象定义属性
  // 滚动距离顶部的高度
  Object.defineProperty(bodyScrollEl, 'scrollTop', {
    get() {
      return document.body.scrollTop || document.documentElement.scrollTop
    },
    set(val) {
      document.body.scrollTop = val
      document.documentElement.scrollTop = val
    }
  })

  // 文档最大高度
  Object.defineProperty(bodyScrollEl, 'scrollHeight', {
    get() {
      return document.body.scrollHeight || document.documentElement.scrollHeight
    }
  })
  // 可视区高度
  Object.defineProperty(bodyScrollEl, 'offsetHeight', {
    get() {
      return window.innerHeight
    }
  })

  // 赋值初始化
  options = Object.assign(
    {
      allowNoActive: true,
      sectionSelector: 'h1,h2,h3',
      data: null,
      offset: 20,
      time: 500,
      steps: 30,
      easing: null,
      active: {
        selector: null,
        class: ['active']
      },
      link: {
        selector: 'a'
      }
    },
    // 传入的options合并
    options || {}
  )

  // =============================================主体部分

  Vue.directive('scroll-spy', {
    // 钩子
    // el：指令所绑定的元素，可以用来直接操作 DOM。

    bind(el, binding, vnode) {
      scrollSpyElements.length = 0
      for (let index = 0; index < el.children.length; index++) {
        const element = el.children[index]
        if (options.sectionSelector.includes(element.localName)) {
          scrollSpyElements.push(element)
        }
      }

      if (scrollSpyElements.length != 0) {
        window.addEventListener('scroll', onScroll)
      }
    },
    inserted(el) {},
    componentUpdated(el, binding) {},
    unbind(el) {
      window.removeEventListener('scroll', onScroll)
    }
  })

  // curr是现在在激活的
  let curr = 0
  // 前一个标题偏移
  let pre = 0
  function onScroll() {
    if (curr > scrollSpyElements.length - 1) {
      curr = scrollSpyElements.length - 1
    }
    // 距离顶部偏移量

    const top = bodyScrollEl.scrollTop

    if (curr > 0 && top < pre) {
      curr--
      refresh()
    }
    // 当前标题偏移
    const currTop = getOffsetTop(scrollSpyElements[curr], document)

    if (top > currTop - 10) {
      pre = currTop
      refresh()
      curr++
    }
  }

  function refresh() {
    for (let index = 0; index < activableElements.length; index++) {
      activableElements[index].classList.remove('active')
    }

    activableElements[curr].classList.add('active')
  }

  function getOffsetTop(elem, untilParent) {
    let offsetTop = 0
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop
      }
      elem = elem.offsetParent
    } while (elem && elem !== untilParent)
    return offsetTop
  }

  // ========================================== toc部分的 li列表已经提前生成
  function scrollSpyActive(el, binding) {
    const activeOptions = Object.assign({}, options.active, binding.value)

    initScrollActiveElement(el, activeOptions)
  }

  // 初始化激活的元素
  function initScrollActiveElement(el, activeOptions) {
    setTimeout(() => {
      activableElements = findElements(el, activeOptions.selector)
    }, 200)
  }

  function findElements(el, selector) {
    if (!selector) {
      return el.children
    }
  }

  Vue.directive('scroll-spy-active', {
    inserted: scrollSpyActive,
    componentUpdated: scrollSpyActive
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install

export { install }
