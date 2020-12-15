import Vue from 'vue'

export default ({ app, store, route, redirect }) => {
  const close = () => {
    store.commit('modules/tips/STOP_NOTIFY')
  }
  const start = (params) => {
    store.dispatch('modules/tips/handleNotify', params)
  }
  const notifying = {
    close
  }

  const notify = (params) => {
    start(params)
    return notifying
  }

  Vue.prototype.$notify = notify
  app.$notify = notify
}
