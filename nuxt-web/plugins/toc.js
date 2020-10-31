export default () => {
  /* eslint-disable */
  $(document).ready(function() {
    let temp = 0
    let top = 0
    $(window).scroll(() => {
      // 持续向下

      temp = top

      top = $(document).scrollTop()

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

    //================================ 目录生成相关
    var headers = $('#post-content').find('h1, h2, h3')
    var post_toc = $('#post-toc')

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
  })
}
