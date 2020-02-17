// import { scrollWithAnimation, Easing } from './animate.js'

const install = (Vue, options) => {
  if (install.installed) return

  const bodyScrollEl = {}

  // For ff, ie
  Object.defineProperty(bodyScrollEl, 'scrollTop', {
    get() {
      return document.body.scrollTop || document.documentElement.scrollTop
    },
    set(val) {
      document.body.scrollTop = val
      document.documentElement.scrollTop = val
    }
  })

  Object.defineProperty(bodyScrollEl, 'scrollHeight', {
    get() {
      return document.body.scrollHeight || document.documentElement.scrollHeight
    }
  })

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

  options = Object.assign(
    {
      allowNoActive: false,
      sectionSelector: 'h2,h3',
      data: null,
      offset: 0,
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

  function initScrollSections(el, sectionSelector) {
    const id = scrollSpyId(el)
    const scrollSpyContextEl = el[scrollSpyContext]
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
      }
      elem = elem.offsetParent
    } while (elem && elem !== untilParent)
    return offsetTop
  }

  function scrollTo(el, index) {
    const id = scrollSpyId(el)
    const idScrollSections = scrollSpySections[id]

    const { scrollEl, options } = el[scrollSpyContext]
    const current = scrollEl.scrollTop

    if (idScrollSections[index]) {
      const target = getOffsetTop(idScrollSections[index]) - options.offset
      if (options.easing) {
        // scrollWithAnimation(
        //   scrollEl,
        //   current,
        //   target,
        //   options.time,
        //   options.easing
        // )
        return
      }

      const time = options.time
      const steps = options.steps
      const timems = parseInt(time / steps)
      const gap = target - current
      for (let i = 0; i <= steps; i++) {
        const pos = current + (gap / steps) * i
        setTimeout(() => {
          scrollEl.scrollTop = pos
        }, timems * i)
      }
    }
  }

  Vue.directive('scroll-spy', {
    bind(el, binding, vnode) {
      function onScroll() {
        const id = scrollSpyId(el)
        // console.log(id)
        const idScrollSections = scrollSpySections[id]
        // console.log(scrollSpySections)
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

        index = index - 1
        // console.log(idScrollSections)
        if (index < 0) {
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
        // console.log(index)
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

      vnode.context.$scrollTo = scrollTo.bind(null, el)

      const id = scrollSpyId(el)

      el[scrollSpyContext] = {
        onScroll,
        options: Object.assign({}, options, binding.value),
        id: scrollSpyId(el),
        eventEl: el,
        scrollEl: el
      }

      scrollSpyElements[id] = el
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
