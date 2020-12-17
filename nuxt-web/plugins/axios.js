import Vue from 'vue'

export default ({ app, store, route, redirect }) => {
  const axios = app.$axios

  // 基本配置
  // axios.defaults.timeout = 20000
  // axios.defaults.headers.post['Content-Type'] = 'application/json'
  // axios.defaults.withCredentials = true
  axios.defaults.baseURL = process.env.BASE_URL
  // 请求回调
  axios.onRequest((config) => {
    // 设置token

    if (store.state.modules.user && store.state.modules.user.token) {
      config.headers.Authorization = 'Bearer ' + store.state.modules.user.token
    }
  })

  // code返回回调
  axios.onResponse((res) => {
    if (res.data.respCode === 0) {
      app.$notify({ text: res.data.respMsg })
    }
    return res.data
  })

  // 内部错误回调
  axios.onError((error) => {
    app.$notify({ text: error })
  })
  Vue.prototype.$http = axios
}
