import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function() {
    this.listenScrollBehave()
  },
  watch: {
    $route: function() {
      window.scrollTo(0, 0)
    }
  },

  methods: {
    throttle2() {
      // onScroll函数节流

      let previous = 0

      // previous初始设置上一次调用 onScroll 函数时间点为 0。

      let timeout

      const wait = 1550

      // 250毫秒触发一次

      return () => {
        const now = Date.now()

        const remaining = wait - (now - previous)

        if (remaining <= 0) {
          if (timeout) {
            window.clearTimeout(timeout)
          }

          previous = now

          timeout = null

          this.handleScroll()
        } else if (!timeout) {
          timeout = window.setTimeout(this.handleScroll, wait)
        }
      }
    },
    listenScrollBehave: function() {
      window.onscroll = this.throttle2()
    },
    handleScroll: function() {
      $(document).ready(function() {
        var p = 0,
          t = 0

        $(document).scroll(function() {
          p = $(this).scrollTop()
          //   console.log(p)

          if (t >= p) {
            try {
              if (
                $('#navigation')
                  .attr('class')
                  .indexOf('fadeOut') != -1
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
                  .indexOf('fadeOut') == -1
              ) {
                $('#navigation').removeClass('animated fadeIn')
                $('#navigation').addClass('animated fadeOut')
              }
            } catch {
              return
            }
          }

          setTimeout(function() {
            t = p
          }, 0)
          //开始监听滚动条
          //获取当前滚动条高度
          var max = $(document).height()
          var top = $(document).scrollTop()
          var viewH = $(window).height()

          if (
            document.body.scrollTop > 650 ||
            document.documentElement.scrollTop > 650
          ) {
            //   $(".table-of-contents").offset({ top: document.documentElement.scrollTop });
            // $(".table-of-contents").css("top",document.documentElement.scrollTop-450+"px");
            try {
              if (
                $('.table-of-contents')
                  .attr('class')
                  .indexOf('fadeInDown') == -1
              ) {
                $('.table-of-contents').removeClass('animated fadeInUp')
                $('.table-of-contents').addClass(' animated fadeInDown fixed')
              }
            } catch {
              return
            }

            // window.addEventListener('scroll', debounce(scrollFunc, 0));
            // $(".table-of-contents").removeClass("animated hinge");
          } else {
            try {
              if (
                $('.table-of-contents')
                  .attr('class')
                  .indexOf('fadeInUp') == -1
              ) {
                $('.table-of-contents').removeClass(
                  ' animated fadeInDown fixed'
                )
                $('.table-of-contents').addClass('animated fadeIn absolute')
              }
            } catch {
              return
            }

            // window.removeEventListener('scroll', debounce(scrollFunc));
          }

          if ((top / (max - viewH)) * 100 > 96) {
            $('.table-of-contents').addClass('showoff')
          } else {
            $('.table-of-contents').removeClass('showoff')
          }
        })
      })
    }
  }
})
