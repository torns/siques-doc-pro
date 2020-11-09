/* eslint-disable */
export default (mode, height, uploadCallback) => {
  editormd.katexURL = {
    js: '//cdn.siques.cn/libs/js/katex.min', // default: //cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min
    css: '//cdn.siques.cn/libs/css/katex.min' // default: //cdnjs.cloudflare.com/ajax/libs/KaTeX/0.3.0/katex.min
  }

  // console.log(editormd.katexURL)

  return editormd('editor', {
    // width: '100%!important',
    height: height,
    // markdown: "xxxx",     // dynamic set Markdown text
    path: 'https://cdn.siques.cn/libs/js/', // Autoload modules mode, codemirror, marked... dependents libs path

    autoHeightEnabled: true,

    //theme : "dark",
    //previewTheme : "dark",
    //editorTheme : "pastel-on-dark",
    markdown: '',
    codeFold: true,
    //syncScrolling : false,
    saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
    searchReplace: true,
    watch: mode === 'mini' ? false : true, // 关闭实时预览
    htmlDecode: 'video,style,script,iframe|on*', // 开启 HTML 标签解析，为了安全性，默认不开启
    //toolbar  : false,             //关闭工具栏
    //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
    emoji: true,
    taskList: true,
    tocm: true, // Using [TOCM]
    tex: true, // 开启科学公式TeX语言支持，默认关闭
    // flowChart: true, // 开启流程图支持，默认关闭
    // sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
    //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
    //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
    //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
    //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
    //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff

    toolbarIcons: () => {
      console.log(mode)
      if (mode) return editormd.toolbarModes[mode]
      else {
        return [
          'undo',
          'redo',
          '|',
          'bold',
          'del',
          'italic',
          'quote',
          'ucwords',
          'uppercase',
          'lowercase',
          '|',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          '|',
          'list-ul',
          'list-ol',
          'hr',
          '|',
          'link',
          'reference-link',
          'image',
          'file',
          'code',
          'preformatted-text',
          'code-block',
          'table',
          'datetime',
          'html-entities',
          'pagebreak',
          '|',
          'goto-line',
          'watch',
          'preview',
          'fullscreen',
          'clear',
          'search',
          '|',
          'help'
          // 'info'
        ]
      }
    },
    toolbarIconsClass: {
      file: 'fa-upload' // 指定一个FontAawsome的图标类
    },
    // // 自定义工具栏按钮的事件处理
    toolbarHandlers: {
      /**
       * @param {Object}      cm         CodeMirror对象
       * @param {Object}      icon       图标按钮jQuery元素对象
       * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
       * @param {String}      selection  编辑器选中的文本
       */
      file: function(cm, icon, cursor, selection) {
        uploadCallback(cm, icon, cursor, selection)
      }
    },

    lang: {
      toolbar: {
        file: '上传文件' // 自定义按钮的提示文本，即title属性
      }
    },
    imageUpload: false,
    imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp']
  })
}
