export default () => {
  /* eslint-disable */
  $(document).ready(function() {
    let temp = 0
    let top = 0
    $(window).scroll(() => {
      // 持续向下

      temp = top

      top = $(document).scrollTop()

      console.log(temp)
      console.log(top)
      if (temp - top > 0) {
        // console.log('持续向上')
        $('#navigation').removeClass('animated fadeOut')
        $('#navigation').addClass('animated fadeIn')
      } else {
        // console.log('持续向下')
        $('#navigation').removeClass('animated fadeIn')
        $('#navigation').addClass('animated fadeOut')
      }

      // console.log(top)
      if (top < 2) {
        $('#menu').removeClass('showMenu')
        $('#menu').addClass('hideMenu')
      } else {
        $('#menu').removeClass('hideMenu')
        $('#menu').addClass('showMenu')
      }
    })

    var headers = $('#post-content').find('h1, h2, h3')
    var post_toc = $('#post-toc')

    // var header_level = 'h1'
    // 生成目录

    for (let index = 0; index < headers.length; index++) {
      const header = headers[index]

      var new_a = $('<a class="nav-link ellipsis-1"></a>')

      new_a.addClass(`toc-${header.localName}`)

      new_a.attr('href', '#' + header.getAttribute('id'))

      var new_div = $('<div class="ellipsis-1"></div>')
      new_div.text(header.innerText.split('#')[0])
      new_a.append(new_div)

      new_a.append('<span></span>')
      post_toc.append(new_a)
    }

    $('.sidebar nav   a').wrap('<li></li>')

    // if ($('.mask').is(':visible')) {
    //   $('.context').addClass('blur')
    // } else {
    //   $('.context').removeClass('blur')
    // }

    // var toc_position = $('#toc').offset().top
    // var toc_width = $('#toc').width()
    // var positon = null
    // 滚动事件，修改目录部分的 position

    // $(window).scroll(function() {
    //   var toc = $('#toc')

    //   var max = $(document).height()
    //   var top = $(document).scrollTop()

    //   var viewH = $(window).height()
    //   var boxHeight = $('#toc').height()

    //   var activeHeight = $('li.active')[0].offsetTop

    //   if ($(window).scrollTop() >= toc_position + 238) {
    //     if (viewH - activeHeight < 100) {
    //       toc.css('top', viewH - activeHeight - 100)
    //       positon = viewH - activeHeight - 100
    //     } else {
    //       toc.css('top', 0)
    //       toc.css('position', 'fixed')
    //     }
    //   } else {
    //     toc.css('top', '')
    //     toc.css('position', '')
    //   }
    // })
  })
}
