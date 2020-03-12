// import { scrollWithAnimation, Easing } from './animate.js'

const install = (Vue, options) => {
  if (install.installed) return

  if (typeof window === 'undefined') return

  const bodyScrollEl = {}

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

  const scrollSpyContext = '@@scrollSpyContext'
  const scrollSpyElements = {}
  const scrollSpySections = {}
  const activeElement = {}
  const activableElements = {}
  const currentIndex = {}

  // 赋值初始化
  options = Object.assign(
    {
      allowNoActive: false,
      sectionSelector: 'h2,h3',
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

  // h2
  function findElements(container, selector) {
    if (!selector) {
      return container.children
    }

    const id = scrollSpyId(container)

    const elements = []

    for (const el of container.querySelectorAll(selector)) {
      // Filter out elements that are owned by another directive
      if (scrollSpyIdFromAncestors(el) === id) {
        elements.push(el)
      }
    }
    // console.log(elements)
    return elements
  }

  function scrollSpyId(el) {
    return (
      el.getAttribute('data-scroll-spy-id') ||
      el.getAttribute('scroll-spy-id') ||
      'default'
    )
  }

  function scrollSpyIdDefined(el) {
    return (
      !!el.getAttribute('data-scroll-spy-id') ||
      !!el.getAttribute('scroll-spy-id')
    )
  }

  function scrollSpyIdFromAncestors(el) {
    do {
      if (scrollSpyIdDefined(el)) {
        return scrollSpyId(el)
      }
      el = el.parentElement
    } while (el)
    return 'default'
  }

  // sectionSelector=h2,h3
  function initScrollSections(el, sectionSelector) {
    const id = scrollSpyId(el)
    // el被监听的内容范围
    // sectionSelector=h2,h3
    // id =default
    // scrollSpyContext = '@@scrollSpyContext'
    const scrollSpyContextEl = el[scrollSpyContext]
    // console.log(scrollSpyContextEl)
    const idScrollSections = findElements(el, sectionSelector)
    scrollSpySections[id] = idScrollSections

    if (idScrollSections[0] && idScrollSections[0].offsetParent !== el) {
      scrollSpyContextEl.eventEl = window
      scrollSpyContextEl.scrollEl = bodyScrollEl
    }
  }

  function getOffsetTop(elem, untilParent) {
    let offsetTop = 0
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop
        // console.log(offsetTop)
      }
      elem = elem.offsetParent
      // console.log(elem)
    } while (elem && elem !== untilParent)
    return offsetTop
  }

  // function scrollTo(el, index) {
  //   const id = scrollSpyId(el)
  //   const idScrollSections = scrollSpySections[id]

  //   const { scrollEl, options } = el[scrollSpyContext]
  //   const current = scrollEl.scrollTop

  //   if (idScrollSections[index]) {
  //     const target = getOffsetTop(idScrollSections[index]) - options.offset
  //     if (options.easing) {
  //       // scrollWithAnimation(
  //       //   scrollEl,
  //       //   current,
  //       //   target,
  //       //   options.time,
  //       //   options.easing
  //       // )
  //       return
  //     }

  //     const time = options.time
  //     const steps = options.steps
  //     const timems = parseInt(time / steps)
  //     const gap = target - current
  //     for (let i = 0; i <= steps; i++) {
  //       const pos = current + (gap / steps) * i
  //       setTimeout(() => {
  //         scrollEl.scrollTop = pos
  //         console.log(scrollEl)
  //       }, timems * i)
  //     }
  //   }
  // }

  Vue.directive('scroll-spy', {
    // 钩子
    // el：指令所绑定的元素，可以用来直接操作 DOM。

    bind(el, binding, vnode) {
      function onScroll() {
        // id= default
        const id = scrollSpyId(el)

        // initScrollSections函数中拿到
        // console.log(scrollSpySections)
        const idScrollSections = scrollSpySections[id]

        const { scrollEl, options } = el[scrollSpyContext]

        // console.log(scrollEl)
        let index

        if (
          scrollEl.offsetHeight + scrollEl.scrollTop >=
          scrollEl.scrollHeight - 10
        ) {
          index = idScrollSections.length
        } else {
          for (index = 0; index < idScrollSections.length; index++) {
            if (
              getOffsetTop(idScrollSections[index], scrollEl) - options.offset >
              scrollEl.scrollTop
            ) {
              break
            }
          }
        }

        // 当前的index
        index = index - 1

        // console.log(index)
        if (index < 0) {
          // 小于零就归零
          currentIndex.default = -1
          index = options.allowNoActive ? null : 0
        } else if (
          options.allowNoActive &&
          index >= idScrollSections.length - 1 &&
          getOffsetTop(idScrollSections[index]) +
            idScrollSections[index].offsetHeight <
            scrollEl.scrollTop
        ) {
          index = null
        }
        // console.log(activeElement)
        // console.log(index, currentIndex)
        // 添加active类的方法
        if (index !== currentIndex[id]) {
          let idActiveElement = activeElement[id]
          if (idActiveElement) {
            const activeClasses =
              idActiveElement[scrollSpyContext].options.class
            activeClasses.forEach(function(element) {
              idActiveElement.classList.remove(element)
            })
            activeElement[id] = null
          }

          // console.log(currentIndex)

          currentIndex[id] = index
          if (
            typeof currentIndex !== 'undefined' &&
            Object.keys(activableElements).length > 0
          ) {
            idActiveElement = activableElements[id][currentIndex[id]]
            activeElement[id] = idActiveElement
            if (idActiveElement) {
              const activeClasses =
                idActiveElement[scrollSpyContext].options.class

              activeClasses.forEach(function(element) {
                idActiveElement.classList.add(element)
              })
            }
          }

          if (options.data) {
            Vue.set(vnode.context, options.data, index)
          }
        }
      }

      // vnode.context.$scrollTo = scrollTo.bind(null, el)

      const id = scrollSpyId(el)

      el[scrollSpyContext] = {
        onScroll,
        options: Object.assign({}, options, binding.value),
        id: scrollSpyId(el),
        eventEl: el,
        scrollEl: el
      }

      scrollSpyElements[id] = el
      // console.log(scrollSpyElements)
      delete currentIndex[id]
    },
    inserted(el) {
      const {
        options: { sectionSelector }
      } = el[scrollSpyContext]
      initScrollSections(el, sectionSelector)
      const { eventEl, onScroll } = el[scrollSpyContext]
      eventEl.addEventListener('scroll', onScroll)

      onScroll()
    },
    componentUpdated(el, binding) {
      el[scrollSpyContext].options = Object.assign({}, options, binding.value)
      const {
        onScroll,
        options: { sectionSelector }
      } = el[scrollSpyContext]

      initScrollSections(el, sectionSelector)
      onScroll()
    },
    unbind(el) {
      const { eventEl, onScroll } = el[scrollSpyContext]
      eventEl.removeEventListener('scroll', onScroll)
    }
  })
  // 滚动监听激活
  function scrollSpyActive(el, binding) {
    const activeOptions = Object.assign({}, options.active, binding.value)

    initScrollActiveElement(el, activeOptions)
  }

  // 初始化激活的元素
  function initScrollActiveElement(el, activeOptions) {
    const id = scrollSpyId(el)

    activableElements[id] = findElements(el, activeOptions.selector)
    const arr = [...activableElements[id]]
    // console.log(arr)
    arr.map((el) => {
      el[scrollSpyContext] = {
        options: activeOptions
      }
    })
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
