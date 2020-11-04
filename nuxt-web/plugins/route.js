export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    // console.log(to)
    if (typeof document !== 'undefined' && from.fullPath === '/') {
      store.commit('setScrollTop', { name: from.path, top: document.documentElement.scrollTop })
    }
  })
}
