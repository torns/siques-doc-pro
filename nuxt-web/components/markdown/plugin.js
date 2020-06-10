export default (editor) => {
  /* eslint-disable */
  // 获取编辑器上的功能条
  const toolbar = editor.getUI().getToolbar()
  // 移除掉这个，自定义粘贴事件
  editor.eventManager.removeEventHandler('paste')
  editor.eventManager.removeEventHandler('drop')
  // 添加自定义按钮 第二个参数代表位置，不传默认放在最后
  toolbar.addButton(
    {
      name: 'customize',
      className: 'upload-img',
      event: 'uploadEvent',
      tooltip: '插入图片',
      /* eslint-disable */
      // eslint-disable-next-line
      $el: $('<button class="custom-button fa fa-image" style="font-size: 14px;color: #000"></button>')
    },
    15
  )

  // toolbar.addButton(
  //   {
  //     name: 'customize',
  //     event: 'annotation',
  //     tooltip: '插入代码注解',
  //     /* eslint-disable */
  //     // eslint-disable-next-line
  //     $el: $(
  //       '<button class="custom-button fa fa-dot-circle-o " style="font-size: 14px;color: #000"></button>'
  //     )
  //   },
  //   16
  // )
}
