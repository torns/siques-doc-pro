import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function() {
    var myOption = this.getScrollData
    if (myOption) {
      this.handleScroll()
    }
  },

  watch: {
    $route: function() {
      window.scrollTo(0, 0)
    }
  },

  methods: {
    handleScroll: function() {
      var p = 0,
        t = 0,
        s = null,
        timer = null
      $(document).ready(function() {
        if (s == null) {
          s = $(document).scroll(() => {
            if (typeof timer === 'number') {
              clearTimeout(timer)
            }

            timer = setTimeout(() => {
              //添加业务逻辑
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
              setTimeout(function() {
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
            }, 200)
          })
        }
      })
    }
  }
})
