export const state = () => ({
  loginFormVisible: false,
  pageLoading: false,
  selectedCollection: {},
  selectedDoc: {},
  docSideBar: false,
  message: '已同步',
  routerScrollTop: {},
  extendMenu: false
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
  SET_DOC_BODY(state, data) {
    state.selectedDoc.body = data
  },
  PUSH_MSG(state, data) {
    state.message = data
  },
  SET_DOCSIDEBAR(state, data) {
    state.docSideBar = data
  },
  SET_EXTENDMENU(state, data) {
    state.extendMenu = data
  },
  SET_PAGELOADING(state, data) {
    state.pageLoading = data
  }
}

// 验证

export const actions = {
  getScrollTop({ state, commit }, data) {
    return state.routerScrollTop[data]
  },

  LoginOut({ commit }) {
    commit('SET_DOC', {})
    commit('SET_COLLECTION', {})
    commit('modules/doc/SET_DOCTREE', [])
    commit('modules/doc/SET_DELDOC', [])
    commit('modules/collection/SET_COLLECTION', [])
    commit('modules/collection/SET_DELCOLLECTION', [])
    commit('modules/user/SET_TOKEN', '')
    commit('modules/user/SET_INFO', {})
    commit('modules/user/SET_STATUS', false)
  }
}
