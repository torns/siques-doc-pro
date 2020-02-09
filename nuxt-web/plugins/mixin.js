import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function() {
    this.listenScrollBehave()
  },

  methods: {
    listenScrollBehave: function() {
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
