import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: process.env.BASE_URL
})

export default ({ store }) => {
  http.interceptors.request.use(
    (config) => {
      if (store.state.auth['auth._token.local']) {
        config.headers.Authorization =
          store.state.auth['auth._token.local'] || ''
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
          message: '未登录暂无权限'
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
