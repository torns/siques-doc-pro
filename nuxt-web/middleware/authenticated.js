export default function({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.UserNotExist) {
    store.commit('toggleLoginForm')
    return redirect('/')
  }
}
