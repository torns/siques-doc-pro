function getBrowserInfo() {
  if (process.client) {
    const agent = navigator.userAgent.toLowerCase()

    const regStrie = /msie [\d.]+;/gi
    const regStrff = /firefox\/[\d.]+/gi
    const regStrchrome = /chrome\/[\d.]+/gi
    const regStrsaf = /safari\/[\d.]+/gi
    // IE
    if (agent.includes('msie') > 0) {
      return agent.match(regStrie)
    }
    // firefox
    if (agent.includes('firefox') > 0) {
      return agent.match(regStrff)
    }
    // Chrome
    if (agent.includes('chrome') > 0) {
      return agent.match(regStrchrome)
    }
    // Safari
    if (agent.includes('safari') > 0 && agent.includes('chrome') < 0) {
      return agent.match(regStrsaf)
    }
  }
}
function detectOS() {
  if (process.client) {
    const sUserAgent = navigator.userAgent

    const isWin =
      navigator.platform === 'Win32' || navigator.platform === 'Windows'

    const isMac =
      navigator.platform === 'Mac68K' ||
      navigator.platform === 'MacPPC' ||
      navigator.platform === 'Macintosh' ||
      navigator.platform === 'MacIntel'
    if (isMac) return 'Mac'
    const isUnix = navigator.platform === 'X11' && !isWin && !isMac

    if (isUnix) return 'Unix'
    const isLinux = String(navigator.platform).includes('Linux')

    const bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === 'android'
    if (isLinux) {
      if (bIsAndroid) return 'Android'
      else return 'Linux'
    }

    if (isWin) {
      const isWin2K =
        sUserAgent.includes('Windows NT 5.0') ||
        sUserAgent.includes('Windows 2000')
      if (isWin2K) return 'Win2000'
      const isWinXP =
        sUserAgent.includes('Windows NT 5.1') ||
        sUserAgent.includes('Windows XP')

      if (isWinXP) return 'WinXP'
      const isWin2003 =
        sUserAgent.includes('Windows NT 5.2') ||
        sUserAgent.includes('Windows 2003')
      if (isWin2003) return 'Win2003'
      const isWinVista =
        sUserAgent.includes('Windows NT 6.0') ||
        sUserAgent.includes('Windows Vista')
      if (isWinVista) return 'WinVista'
      const isWin7 =
        sUserAgent.includes('Windows NT 6.1') ||
        sUserAgent.includes('Windows 7')
      if (isWin7) return 'Win7'
      const isWin8 =
        sUserAgent.includes('windows nt6.2') || sUserAgent.includes('Windows 8')
      if (isWin8) return 'Win8'
      const isWin10 =
        sUserAgent.includes('Windows NT 10.0') ||
        sUserAgent.includes('Windows 10')

      if (isWin10) return 'Win10'
    }
    return '其他'
  }
}
function digits() {
  // let agent = navigator.userAgent.toLowerCase()
  if (process.client) {
    const sUserAgent = navigator.userAgent
    const is64 = sUserAgent.includes('WOW64') > -1
    if (is64) {
      return ' 64位'
    } else {
      return ' 32位'
    }
  }
}
export const Browser = getBrowserInfo() || ''
export const OS = detectOS() + digits()
