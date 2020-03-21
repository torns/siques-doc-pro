/* eslint-disable */
import vue from 'vue'
export default () => {
  const notify = vue.prototype.$notify
  $('pre code a ').click((e) => {
    copyContent(e.currentTarget.nextElementSibling.innerText)
    notify({
      message: '复制成功',
      type: 'success'
    })
  })
}

function copyContent(content) {
  document.addEventListener('copy', save) // 监听浏览器copy事件
  document.execCommand('copy') // 执行copy事件，这时监听函数会执行save函数。
  document.removeEventListener('copy', save) // 移除copy事件

  // 保存方法
  function save(e) {
    e.clipboardData.setData('text/plain', content) // 剪贴板内容设置
    e.preventDefault()
  }
}
