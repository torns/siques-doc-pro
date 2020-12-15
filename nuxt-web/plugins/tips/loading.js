import Vue from 'vue'

export default ({ app, store, route, redirect }) => {
  const close = () => {
    store.commit('modules/tips/STOP_LOADING')
  }
  const start = (params) => {
    store.dispatch('modules/tips/handleLoading', params)
  }
  const loading = {
    close
  }

  const load = (params) => {
    start(params)
    return loading
  }

  Vue.prototype.$loading = load
  app.$loading = load
}
