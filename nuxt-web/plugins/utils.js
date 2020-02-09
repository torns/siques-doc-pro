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

export default () => {
  // 代码前数字

  $('pre code').each(function() {
    $(this).html(
      '<ul><li>' +
        $(this)
          .html()
          .replace(/\n/g, '</li><li>') +
        '\n</li></ul>'
    )
    // 给指定行增加样式
    try {
      var line = $(this)
        .attr('class')
        .match(/\d+/g)
      for (let i in line) {
        $(this)
          .children()
          .children()
          .eq(line[i] - 1)
          .addClass('selected')
      }
    } catch (err) {
      throw err
    }
  })
  // 去掉最后一行的空行
  $('code ul li:last-child').remove()
}
