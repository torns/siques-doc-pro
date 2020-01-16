export default ({ app, store, redirect }) => {
  // const token = store.getters.token
  // // 判断userInfo是否存在
  // if (token && !store.getters.userInfo) {
  //     store.dispatch('setUser')
  // }

  // // 判断配置项pick是否存在，不存在即请求获取
  // if (!store.getters.pick) {
  //     store.dispatch('setPick')
  // }
  // if (isIos()) {
  //     store.commit('setWechatSignUrl', window.location.href)
  // }
  app.router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.meta.requireAuth) {
      if (store.state.UserNotExist === false) {
        next()
      } else {
        store.commit('toggleLoginForm')
      }
    } else {
      next()
    }
  })
}
