import defalutConfig from './defalut-config'

export default (height) => {
  // eslint-disable-next-line
  return new tui.Editor({
    /* eslint-disable */
    el: document.getElementById('editorSection'),
    initialEditType: 'markdown',
    language: 'zh_CN',
    height: height ? height : '700px',
    ...defalutConfig
  })
}
