import axios from 'axios'
import Vue from 'vue'

// import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: 'http://localhost:3001'
})

http.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 添加一个反应拦截器
export default ({ store }) => {
  http.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      if (err.response) {
        Vue.prototype.$notify({
          type: 'error',
          message: err.response.message
        })

        if (err.response.status === 401) {
          // 赋值store.states
          store.commit('toggleLoginForm')
          store.commit('toggleUser')
        }
      }

      return Promise.reject(err)
    }
  )
}

Vue.prototype.$http = http
