// export default ({ app, store, redirect }) => {
//   app.router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//       if (store.state.UserNotExist === false) {
//         next()
//       } else {
//         store.commit('toggleLoginForm')
//       }
//     } else {
//       next()
//     }
//   })
// }
