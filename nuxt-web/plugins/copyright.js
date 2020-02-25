export default (name) => {
  /* eslint-disable */
  $(document).on('copy', function(e) {
    const selected = window.getSelection()
    const selectedText = selected.toString().replace(/\n/g, '<br>') // Solve the line breaks conversion issue
    const copyFooter =
      '<br>---------------------<br>著作权归作者所有。<br>' +
      '商业转载请联系作者获得授权，非商业转载请注明出处。<br>' +
      `作者：${name}<br> 源地址：` +
      document.location.href +
      '<br>来源：思趣<br>© 版权声明：本文为博主原创文章，转载请附上博文链接！'
    const copyHolder = $('<div>', {
      id: 'temp',
      html: selectedText + copyFooter,
      style: { position: 'absolute', left: '-99999px' }
    })

    $('body').append(copyHolder)
    selected.selectAllChildren(copyHolder[0])
    window.setTimeout(function() {
      copyHolder.remove()
    }, 0)
  })
}
