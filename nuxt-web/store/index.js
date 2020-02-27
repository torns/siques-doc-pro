export const state = () => ({
  UserNotExist: true,
  loginFormVisible: false,
  isValid: '',
  selectedCollection: '',
  selectedPost: '',
  time: 0,
  tags: [],
  bakendCode: ''
})

export const mutations = {
  setCode(state, data) {
    state.bakendCode = data
  },
  setCollection(state, data) {
    state.selectedCollection = data
  },
  setPost(state, data) {
    state.selectedPost = data
  },
  setTime(state, data) {
    state.time = data
  },
  timeDcre(state, interval) {
    state.time = state.time - interval
  },
  toggleLoginForm(state) {
    state.loginFormVisible = !state.loginFormVisible
  },
  closeLoginForm(state) {
    state.loginFormVisible = false
  },
  toggleUser(state) {
    state.UserNotExist = true
    state.auth = {}
  },
  toggleEditor(state) {
    state.auth.user.editor = !state.auth.user.editor
  },
  UserExist(state) {
    const autho = localStorage.getItem('auth._token.local')
    state.auth['auth._token.local'] = autho
    state.UserNotExist = false
  },
  updataPersonData(state, data) {
    const key = Object.keys(data)[0]
    state.auth.user[key] = data[key]
  },
  toggleBanner(state) {
    state.showBanner = !state.showBanner
  },
  setUserInfo(state, data) {
    state.user = data
  },
  storeTags(state, data) {
    state.tags = data
  },
  SET_AUTHO(state, auth) {
    state.auth.token = auth
  },
  increLen(state, data) {
    state.auth.user[data] = state.auth.user[data] + 1
  },
  decreLen(state, data) {
    state.auth.user[data] = state.auth.user[data] + 1
  },
  toggleUserLiked(state, data) {
    state.auth.user.likes.push(data)
  },
  deleteUserLiked(state, data) {
    let i
    state.auth.user.likes.map((e, index) => {
      if (e.id === data) {
        i = index
      }
    })
    state.auth.user.likes.splice(i, 1)
  },

  storeUserTag(state, data) {
    data.map((e) => {
      const item = { id: e }
      state.auth.user.tags.push(item)
    })
  },
  deleteUserTag(state, data) {
    let index
    state.auth.user.tags.map((e, i) => {
      // console.log(e.id, i, data)
      if (e.id === data) {
        index = i
      }
    })
    state.auth.user.tags.splice(index, 1)
  },
  uploadUserAvator(state, data) {
    state.auth.user.avator[0].url = data
  }
}

export const getters = {}

// 验证

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // let auth = null
    // if (req.headers.cookie) {
    //   const parsed = cookieparser.parse(req.headers.cookie)
    //   try {
    //     auth = JSON.parse(parsed.auth)
    //   } catch (err) {
    //     // No valid cookie found
    //   }
    // }
    // console.log(auth)
    // commit('setAuth', auth)
  },
  nuxtClientInit({ commit }, { req }) {
    const autho = localStorage.getItem('auth._token.local') // or whatever yours is called
    commit('SET_AUTHO', autho)
    // console.log('From nuxtClientInit - ' + autho)
  }
}
