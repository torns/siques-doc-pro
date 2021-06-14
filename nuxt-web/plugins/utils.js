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

/**
 * 复制内容到粘贴板
 * content : 需要复制的内容
 * message : 复制完后的提示，不传则默认提示"复制成功"
 */
export function copyToClip(content) {
  var aux = document.createElement('input')
  aux.setAttribute('value', content)
  document.body.appendChild(aux)
  aux.select()
  document.execCommand('copy')
  document.body.removeChild(aux)
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
