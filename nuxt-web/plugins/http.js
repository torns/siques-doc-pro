import axios from 'axios'
import Vue from 'vue'

import { mutations } from '../store'

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
        mutations.commit('toggleLoginForm')
        mutations.commit('toggleUser')
      }
    }

    return Promise.reject(err)
  }
)

Vue.prototype.$http = http
