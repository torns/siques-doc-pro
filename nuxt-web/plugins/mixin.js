import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function () {
    this.listenScrollBehave()
  },

  watch: {
    $route: function () {
      window.scrollTo(0, 0)
    }
  },

  methods: {
    throttle2() {
      // onScroll函数节流

      let previous = 0

      // previous初始设置上一次调用 onScroll 函数时间点为 0。

      let timeout

      const wait = 1215550

      // 250毫秒触发一次

      return () => {
        const now = Date.now()

        const remaining = wait - (now - previous)
        // console.log(remaining, now - previous)
        if (remaining <= 0) {
          if (timeout) {
            window.clearTimeout(timeout)
          }

          previous = now

          timeout = null

          this.handleScroll()
        } else if (!timeout) {
          timeout = window.setTimeout(this.handleScroll(), wait)
        }
      }
    },
    listenScrollBehave: function () {
      window.onscroll = this.throttle2()
    },
    handleScroll: function () {
      var p = 0,
        t = 0
      $(document).ready(function () {
        $(document).scroll(function () {
          p = $(this).scrollTop()
          // console.log(t, p)

          if (t >= p) {
            try {
              if (
                $('#navigation')
                  .attr('class')
                  .includes('fadeOut')
              ) {
                $('#navigation').removeClass('animated fadeOut')
                $('#navigation').addClass('animated fadeIn')
              }
            } catch {
              return
            }
          } else {
            try {
              if (
                $('#navigation')
                  .attr('class')
                  .includes('fadeIn')
              ) {
                $('#navigation').removeClass('animated fadeIn')
                $('#navigation').addClass('animated fadeOut')
              }
            } catch {
              return
            }
          }
          // console.log(this)
          setTimeout(function () {
            t = p
          }, 0)
          //开始监听滚动条
          //获取当前滚动条高度
          var max = $(document).height()
          var top = $(document).scrollTop()
          var viewH = $(window).height()

          // if ((top / (max - viewH)) * 100 > 95) {
          //   $('#toc').addClass('showoff')
          // } else {
          //   $('#toc').removeClass('showoff')
          // }
        })
      })
    }
  }
})
