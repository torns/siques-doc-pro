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
  const activeChildrenEl = {}
  const activableElements = {}
  const currentIndex = {}
  let indexArray = []

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
    indexArray = []

    const elements = []

    // let h3index = 0
    let h2index = 0
    let array = []
    for (let index = 0; index < container.querySelectorAll(selector).length; index++) {
      // Filter out elements that are owned by another directive
      const el = container.querySelectorAll(selector)[index]
      if (el.localName === 'h2') {
        array = []
        h2index = index
        indexArray[h2index] = [index]
        h2index += 1
      }

      if (index + 1 < container.querySelectorAll(selector).length) {
        if (el.localName === 'h2' && container.querySelectorAll(selector)[index + 1].localName === 'h3') {
          array.push(index)
          indexArray[h2index - 1] = array
        }
      }

      if (el.localName === 'h3') {
        array.push(index)
        indexArray[h2index - 1] = array
      }
      // console.log(indexArray)

      elements.push(el)
    }
    // console.log(elements)
    return elements
  }

  function scrollSpyId(el) {
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
    // idScrollSections元素列表
    scrollSpySections.default = idScrollSections

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

        if (scrollEl.offsetHeight + scrollEl.scrollTop >= scrollEl.scrollHeight - 10) {
          index = idScrollSections.length
        } else {
          for (index = 0; index < idScrollSections.length; index++) {
            if (getOffsetTop(idScrollSections[index], scrollEl) - options.offset > scrollEl.scrollTop) {
              break
            }
          }
        }

        // 当前的index
        index = index - 1

        if (index < 0) {
          // 小于零就归零
          currentIndex.default = -1
          index = options.allowNoActive ? null : 0
        } else if (options.allowNoActive && index >= idScrollSections.length - 1 && getOffsetTop(idScrollSections[index]) + idScrollSections[index].offsetHeight < scrollEl.scrollTop) {
          index = null
        }
        // console.log(activeElement)
        // console.log(index, currentIndex)
        // 添加active类的方法
        if (index !== currentIndex[id]) {
          let idActiveElement = activeElement[id]
          // let preActiveParent = activeElement[id]
          // let proActiveParent = activableElements[index + 1]

          try {
            if (idActiveElement) {
              const activeClasses = idActiveElement[0][scrollSpyContext].options.class
              // console.log(idActiveElement)
              idActiveElement.forEach((e) => {
                activeClasses.forEach(function(element) {
                  e.classList.remove(element)
                  // preActiveParent.classList.remove(element)
                  // proActiveParent.classList.remove(element)
                })
              })
              activeElement[id] = null
              // activableElements[id] = null
              // activableElements[id] = null
            }
            const childrenClasses = 'active-child'

            activeChildrenEl.default.forEach((e) => {
              e.classList.remove(childrenClasses)
            })
          } catch (error) {}

          // console.log(currentIndex)

          currentIndex[id] = index

          try {
            if (typeof currentIndex !== 'undefined' && Object.keys(activableElements).length > 0) {
              idActiveElement = activableElements[id][currentIndex[id]]

              let i = index
              let pre = index
              let flag = false
              let activeParent = index
              indexArray.forEach((e) => {
                if (e.includes(index)) {
                  activeParent = indexArray.indexOf(e)
                  i = e[e.length - 1]
                  pre = e[0] - 1
                  flag = true
                }
              })

              // console.log(i)

              const idActiveParent = activableElements[id][activeParent]
              const proActiveParent = activableElements[id][i + 1]

              const activeChildren = indexArray[activeParent]
              const children = []
              activeChildren.forEach((e) => {
                children.push(activableElements[id][e])
              })

              activeChildrenEl.default = children

              activeElement[id] = [idActiveElement, proActiveParent, idActiveParent]
              // console.log('activeElement', activeElement)

              if (idActiveElement) {
                // console.log(idActiveElement[scrollSpyContext])
                const activeClasses = idActiveElement[scrollSpyContext].options.class
                const activeParentClasses = 'active-parent'
                activeClasses.forEach(function(element) {
                  idActiveElement.classList.add(element)
                  idActiveParent.classList.add(element)

                  if (flag) {
                    proActiveParent.classList.add(element)
                  }
                })
              }

              if (children) {
                const childrenClasses = 'active-child'
                for (let index = 0; index < children.length; index++) {
                  if (index !== 0) {
                    const e = children[index]
                    e.classList.add(childrenClasses)
                  }
                }
              }
            }
          } catch (error) {}

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
    setTimeout(() => {
      const id = scrollSpyId(el)
      // 元素列表findElements(el, activeOptions.selector)
      activableElements[id] = findElements(el, activeOptions.selector)
      const arr = [...activableElements[id]]
      // const arr1 = Object.keys(activableElements[id])

      // console.log(activableElements)
      // alert(arr1.length === 0)
      // console.log(activableElements[id])
      arr.map((el) => {
        el[scrollSpyContext] = {
          options: activeOptions
        }
      })
    }, 200)
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
