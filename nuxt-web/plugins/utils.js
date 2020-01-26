function wordcounts(body) {
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

export default wordcounts
