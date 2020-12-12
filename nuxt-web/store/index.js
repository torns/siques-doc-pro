export const state = () => ({
  loginFormVisible: false,
  selectedCollection: {},
  selectedDoc: {},
  userCollection: [],
  message: '已同步',
  routerScrollTop: {}
})

export const mutations = {
  setScrollTop(state, data) {
    const { name, top } = data
    state.routerScrollTop[name] = top
  },
  toggleLoginForm(state) {
    state.loginFormVisible = !state.loginFormVisible
  },
  closeLoginForm(state) {
    state.loginFormVisible = false
  },
  SET_COLLECTION(state, data) {
    state.selectedCollection = data
  },
  SET_DOC(state, data) {
    state.selectedDoc = data
  },
  PUSH_MSG(state, data) {
    state.message = data
  }
}

// 验证

export const actions = {
  getScrollTop({ state, commit }, data) {
    return state.routerScrollTop[data]
  }
}
