// ================================ 目录生成相关
/* eslint-disable */
export default () => {
  var headers = $('#doc-content').find('h1, h2, h3')
  var post_toc = $('#doc-toc')
  // 生成目录

  for (let index = 0; index < headers.length; index++) {
    const header = headers[index]

    var new_a = $('<a class="nav-link ellipsis-1"></a>')

    new_a.addClass(`toc-${header.localName}`)

    new_a.attr('href', '#' + header.getAttribute('id'))

    var new_div = $('<div class="ellipsis-1"  ></div>')
    new_div.text(header.innerText.split('#')[0])
    new_a.append(new_div)

    new_a.append('<span></span>')

    post_toc.append(new_a)
  }

  $('.sidebar nav  a').wrap('<li></li>')
}
