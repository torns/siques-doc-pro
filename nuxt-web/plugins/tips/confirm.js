import Vue from 'vue'

export default ({ app, store, route, redirect }) => {
  const start = (params) => {
    store.dispatch('modules/tips/handleConfirm', params)
  }

  const then = (fun) => {
    store.commit('modules/tips/SET_THEN', fun)
    return confirming
  }
  const catchs = (fun) => {
    store.commit('modules/tips/SET_CATCH', fun)
    return confirming
  }

  const confirming = {
    then,
    catch: catchs
  }

  const confirm = (params) => {
    start(params)
    return confirming
  }

  Vue.prototype.$confirm = confirm
  app.$confirm = confirm
}
