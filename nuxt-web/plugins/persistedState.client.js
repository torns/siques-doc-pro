import createPersistedState from 'vuex-persistedstate'
// 前端数据持久化
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'state',
      paths: []
      // paths: ['modules.doc', 'modules.collection', 'modules.user']
      // reducer: (state, paths) => {
      //   return { paths }
      // }
    })(store)
  })
}
