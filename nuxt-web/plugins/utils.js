// 数字统计

export function wordcounts(body) {
  const W = []
  let iNumwords = 0
  let sNumwords = 0
  let sTotal = 0 // 双字节字符;
  let iTotal = 0 // 中文字符；
  let eTotal = 0 // Ｅ文字符

  let inum = 0

  for (let i = 0; i < body.length; i++) {
    const c = body.charAt(i)
    if (c.match(/[\u4E00-\u9FA5]/)) {
      if (isNaN(W[c])) {
        iNumwords++
        W[c] = 1
      }
      iTotal++
    }
  }

  for (let i = 0; i < body.length; i++) {
    const c = body.charAt(i)
    if (c.match('/[^\x00-\xFF]/')) {
      if (isNaN(W[c])) {
        sNumwords++
      }
      sTotal++
    } else {
      eTotal++
    }
    if (c.match(/[0-9]/)) {
      inum++
    }
  }
  console.log(iNumwords, sNumwords, sTotal, eTotal)
  const word = iTotal + inum
  return word
}
/* eslint-disable */
export function listIntercep(taglist) {
  let list = ''
  if (taglist) {
    if (taglist.length === 1) {
      taglist.map((e) => {
        try {
          list = list + e.toLowerCase()
        } catch {
          list = list + e.id
        }
      })
    } else {
      taglist.map((e, index) => {
        if (index === taglist.length - 1) {
          try {
            list = list + e.toLowerCase()
          } catch {
            list = list + e.id
          }
        } else {
          try {
            list = list + e.toLowerCase() + '-'
          } catch {
            list = list + e.id + '-'
          }
        }
      })
    }
  }
  return list
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
    // console.log($(this).html())
    // 给指定行增加样式
    // try {
    //   var line = $(this)
    //     .attr('class')
    //     .match(/\d+/g)

    //   // var line2 = $(this)
    //   //   .attr('class')
    //   //   .split('hljs ')[1]
    //   // console.log(line2)
    //   for (let i in line) {
    //     $(this)
    //       .children()
    //       .children()
    //       .eq(line[i] - 1)
    //       .addClass('selected')
    //   }
    // } catch (err) {
    //   throw err
    // }
  })
  // 去掉最后一行的空行
  // $('code ul li:last-child').remove()

  $('pre code ').each(function() {
    if (
      $(this)
        .text()
        .includes('(begin)')
    ) {
      if (true) {
        let el = $(this)
          .html()
          .match(/<li>\(begin\)([\s\S]*?)\(\/end\)<\/li>/g)

        console.log(el)
        for (let index = 0; index < el.length; index++) {
          let brief = el[index].match(/(?=<span)[\s\S]*?(?=<\/li>)/g)[0]
          let el1 = `
      ${`<details><summary class="point hover-2" style="padding-left: 17px;">${brief}</summary>` + el[index] + '</details>'}`
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

  $('pre code ul').before('<a id="copy"></a>')
}
