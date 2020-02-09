import createPersistedState from 'vuex-persistedstate'
// 前端数据持久化
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'state',
      paths: []
    })(store)
  })
}
