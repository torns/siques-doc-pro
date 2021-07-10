/* eslint-disable */

export function debounce(fnName, time) {
  let timeout = null
  return function() {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      this[fnName]()
    }, time)
  }
}

export function copyToClip(content) {
  document.addEventListener('copy', save) // 监听浏览器copy事件
  document.execCommand('copy') // 执行copy事件，这时监听函数会执行save函数。
  document.removeEventListener('copy', save) // 移除copy事件

  // 保存方法
  function save(e) {
    e.clipboardData.setData('text/plain', content) // 剪贴板内容设置
    e.preventDefault()
  }
}
export function copy(vue) {
  $('pre code a ').click((e) => {
    console.log(vue)
    copyToClip(e.currentTarget.nextElementSibling.innerText)
    vue.$notify({ text: '复制成功' })
  })
}

export function hljs() {
  $('pre code').each(function() {
    $(this).html(
      '<ul><li>' +
        $(this)
          .html()
          .replace(/\n/g, '</li><li>') +
        '\n</li></ul>'
    )
  })

  $('pre  code').each(function() {
    let lang = $(this).attr('class')
    let array = lang.split(' ')
    if (array[0] == 'hljs') lang = array[1]

    if (array[1] == 'hljs') lang = array[0].substring(9)

    if ($(this).children()[0].childElementCount > 2) {
      $(this)
        .children()
        .after($(`<span id="language">${lang}</span>`))
    }
  })
  $('pre  code ul').before('<a id="copy"></a>')
}

function lowercase(value) {
  const regex = /^(?=.*[a-z]).+$/

  if (regex.test(value)) {
    return true
  }
}

function uppercase(value) {
  const regex = /^(?=.*[A-Z]).+$/

  if (regex.test(value)) {
    return true
  }
}

function number(value) {
  const regex = /^(?=.*[0-9]).+$/

  if (regex.test(value)) {
    return true
  }
}

export function phoneLength(value) {
  const regex = /^[1][3,4,5,7,8][0-9]{9}$/
  if (regex.test(value)) {
    return true
  }
}
