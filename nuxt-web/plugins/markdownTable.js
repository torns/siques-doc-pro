export default () => {
  /* eslint-disable */
  $(document).ready(function() {
    var headers = $('#post-content').find('h1, h2, h3')
    var post_toc = $('#post-toc')
    // var header_level = 'h1'
    // 生成目录
    for (var header of headers) {
      var new_a = $('<a class="nav-link ellipsis-1"></a>')

      new_a.addClass('toc-' + header.localName)
      new_a.attr('href', '#' + header.getAttribute('id'))
      new_a.text(header.innerText.split('#')[1])

      post_toc.append(new_a)
    }
    $('nav a').wrap('<li></li>')
    // 绑定滚动监听
    // $('body').scrollspy({ target: '#post-toc' })
  })

  var toc_position =
    $('#toc').offset() !== undefined ? $('#toc').offset().top : ''
  // var toc_width = $('#toc').width()

  // 滚动事件，修改目录部分的 position
  $(window).scroll(function() {
    var toc = $('#toc')
    if ($(window).scrollTop() >= toc_position + 280) {
      // toc.css('width', toc_width)
      toc.css('top', 18)
      toc.css('position', 'fixed')
    } else {
      // toc.css('width', '')
      toc.css('top', '')
      toc.css('position', '')
    }
  })
}
