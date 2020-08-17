import defalutConfig from './defalut-config'

export default (height) => {
  // eslint-disable-next-line
  return new tui.Editor({
    /* eslint-disable */
    el: document.querySelector('#editorSection'),
    initialEditType: 'markdown',
    language: 'zh_CN',
    placeholder: '来愉快的造作吧',
    height: height ? height : '700px',
    exts: [
      {
        name: 'chart',
        minWidth: 100,
        maxWidth: 600,
        minHeight: 100,
        maxHeight: 300
      },
      'scrollSync',
      'colorSyntax'
    ],

    ...defalutConfig
  })
}
