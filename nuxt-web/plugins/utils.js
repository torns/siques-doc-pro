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

export function gitTalk() {
  let gitalk = new Gitalk({
    clientID: '8e6a860f7dc156db8516', // Client ID

    clientSecret: '9e020b47231bd2921a2658fc72baa47407b16aa1', // Client Secret

    repo: 'siques-comment', // 仓库名称
    owner: 'ericheshenghao', // 仓库拥有者
    admin: ['ericheshenghao'],
    id: location.href, // Ensure uniqueness and length less than 50
    distractionFreeMode: false // Facebook-like distraction free mode
  })

  gitalk.render('gitalk-container')
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
export function textToImg(str) {
  let name, fsize
  if (str.length < 2) {
    name = str
    fsize = 60
  } else if (str.length === 2) {
    name = str.substring(0, str.length)
    fsize = 45
  } else if (str.length === 3) {
    name = str.substring(0, str.length)
    fsize = 30
  } else if (str.length === 4) {
    name = str.substring(0, str.length)
    fsize = 25
  } else if (str.length > 4) {
    name = str.substring(0, 2)
    fsize = 45
  }
  const fontSize = 60
  const fontWeight = 'bold'
  const canvas = document.getElementById('head_canvas_default')

  canvas.width = 120
  canvas.height = 120
  const context = canvas.getContext('2d')
  context.fillStyle = getBG(str)
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#FFF'
  context.font = fontWeight + ' ' + fsize + 'px sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(name, fontSize, fontSize + 4)
  return canvas.toDataURL('image/png')
}

function hash(str) {
  let hash = 0
  let chr
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
function getBG(str) {
  const bgArray = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#eca0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d'
  ]

  const color = bgArray[hash(str) % bgArray.length]
  return color
}
