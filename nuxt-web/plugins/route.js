export default ({ app, store }) => {
  app.router.afterEach((to, from, savedPosition) => {
    // console.log(savedPosition)
    // if (typeof document !== 'undefined' && from.fullPath === '/') {
    //   store.commit('setScrollTop', { name: from.path, top: document.documentElement.scrollTop })
    // }
  })
}
