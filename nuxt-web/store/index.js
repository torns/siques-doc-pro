const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  UserNotExist: true,
  loginFormVisible: false,
  user: '',
  isValid: '',
  personalData: '',
  showBanner: true,
  auth: null
})

export const mutations = {
  toggleLoginForm(state) {
    state.loginFormVisible = !state.loginFormVisible
  },
  toggleUser(state) {
    state.UserNotExist = true
  },
  toggleBanner(state) {
    state.showBanner = !state.showBanner
  },
  setUserInfo(state, data) {
    state.user = data
  },
  setAuth(state, auth) {
    state.auth = auth
  }
}

export const getters = {
  getPostLen(state) {
    return state.user.postLength
  }
}

// 验证

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },
  nuxtClientInit({ commit }, { req }) {
    const autho = localStorage.getItem('auth._token.local') // or whatever yours is called
    commit('SET_AUTHO', autho)
    console.log('From nuxtClientInit - ' + autho)
  }
}
