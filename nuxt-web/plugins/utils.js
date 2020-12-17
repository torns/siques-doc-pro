/* eslint-disable */

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
  $('p img').each(function() {
    var title = $(this).attr('alt')
    if (title !== 'img') {
      $(this).after(
        '<div class="img-title">' + '<span class="itag"><i class="fa fa-twitch"></i></span>' + title + '</div>'
      )
    }
  })

  $('pre code').each(function() {
    $(this).html(
      '<ul><li>' +
        $(this)
          .html()
          .replace(/\n/g, '</li><li>') +
        '\n</li></ul>'
    )
  })
  // 去掉最后一行的空行
  $('code ul li:last-child').remove()

  $('pre code ').each(function() {
    if (
      $(this)
        .text()
        .includes('(begin)')
    ) {
      if (true) {
        let el = $(this)
          .html()
          .match(/<li> *\(begin\)([\s\S]*?)\(\/end\) *<\/li>/g)

        console.log(el)
        for (let index = 0; index < el.length; index++) {
          let brief = el[index].match(/(?=<li>)[\s\S]*?(<\/li>)/g)[1]
          brief = brief.replace('<li>', '')
          brief = brief.replace('</li>', '')
          let el1 = `
      ${`<details><summary class="point hover-2" style="padding-left: 5px;">${brief}</summary>` +
        el[index] +
        '</details>'}`
          $(this).html(
            $(this)
              .html()
              .replace(el[index], el1)
          )
        }
      } else {
      }

      let el1 = $(this)
        .html()
        .match(/(<li> *\(begin\) *<\/li>)/g)
      try {
        for (let index = 0; index < el1.length; index++) {
          $(this).html(
            $(this)
              .html()
              .replace(el1[index], '')
          )
        }
      } catch {
        console.log('开始结束匹配有误')
      }

      let el2 = $(this)
        .html()
        .match(/(<li> *\(\/end\) *<\/li>)/)
      try {
        for (let index = 0; index < el2.length; index++) {
          $(this).html(
            $(this)
              .html()
              .replace(el2[index], '')
          )
        }
      } catch {
        console.log('开始结束匹配有误')
      }
    }
  })

  $('summary').click(function() {
    if (!$(this)[0].parentNode.attributes.open) {
      $(this).css({ opacity: 0.2, '-webkit-text-security': 'disc' })
    } else {
      $(this).css({ opacity: 1, '-webkit-text-security': 'inherit' })
    }
  })

  $('pre code').each(function() {
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
  $('pre code ul').before('<a id="copy"></a>')
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

function phoneLength(value) {
  const regex = /^[1][3,4,5,7,8][0-9]{9}$/
  if (regex.test(value)) {
    return true
  }
}
