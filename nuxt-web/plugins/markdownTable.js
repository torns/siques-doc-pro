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
      new_a.text(header.innerText.split('#')[0])

      post_toc.append(new_a)
    }
    $('nav a').wrap('<li></li>')

    var toc_position = $('#toc').offset().top
    // var toc_width = $('#toc').width()
    var positon = null
    // 滚动事件，修改目录部分的 position

    $(window).scroll(function() {
      var toc = $('#toc')

      var max = $(document).height()
      var top = $(document).scrollTop()

      var viewH = $(window).height()
      var boxHeight = $('#toc').height()

      var activeHeight = $('li.active')[0].offsetTop

      if ($(window).scrollTop() >= toc_position + 238) {
        if (top / (max - viewH) > 0.95) {
          toc.css('top', max - viewH - boxHeight - top)

          toc.css('position', 'fixed')
        } else {
          if (viewH - activeHeight < 100) {
            toc.css('top', viewH - activeHeight - 100)
            positon = viewH - activeHeight - 100
          } else {
            toc.css('top', 0)
            toc.css('position', 'fixed')
          }
        }
      } else {
        toc.css('top', '')
        toc.css('position', '')
      }
    })
  })
}
