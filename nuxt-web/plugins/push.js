import vue from 'vue'
export default async () => {
  const http = vue.prototype.$http

  if (
    window.location.href.includes('localhost') ||
    window.location.href.includes('post') ||
    window.location.href.includes('ask') ||
    window.location.href.includes('record')
  ) {
  } else {
    await http.post(
      'http://data.zz.baidu.com/urls?site=siques.cn&token=RshbyPPuO3v3ojbt',
      location.href
    )
  }
}
