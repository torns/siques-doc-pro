import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.BASE_URL
})

if (process.client) {
  http.interceptors.request.use((config) => {
    if (window.localStorage.state) {
      const date = JSON.parse(window.localStorage.state)

      config.headers.Authorization = date.auth['auth._token.local'] || ''
    }
    return config
  })

  // 添加一个反应拦截器

  http.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      if (err.response) {
        // console.log(err.response)
        // Vue.prototype.$notify({
        //   type: 'error',
        //   message: err.response.data.message
        // })
        // if (err.response.status === 401) {
        //   Vue.prototype.$notify({
        //     type: 'error',
        //     message: '授权失败，请重新登录'
        //   })
        // }
      }

      // return Promise.reject(err)
    }
  )
}

Vue.prototype.$http = http
