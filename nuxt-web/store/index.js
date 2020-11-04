export const state = () => ({
  UserNotExist: true,
  loginFormVisible: false,
  isValid: '',
  selectedCollection: '',
  selectedPost: '',
  selectedNoteBookId: '',
  selectedNoteId: '',
  time: 0,
  routerScrollTop: {},
  tags: [],
  imageLinks: [],
  pageImages: [
    { url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/collection/cover3.mp4', path: '/collection' },
    { url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/notes/cover4.mp4', path: '/n' },
    { url: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/tags/cover2.mp4', path: '/tags' },
    { url: 'https://shuxie.oss-accelerate.aliyuncs.com/public/t/cover1.mp4', path: '/t' }
  ],
  bakendCode: ''
})

export const mutations = {
  setScrollTop(state, data) {
    const { name, top } = data

    state.routerScrollTop[name] = top
  },
  // 后端返回验证码，这个乱来的，不可信
  setCode(state, data) {
    state.bakendCode = data
  },
  setCollection(state, data) {
    state.selectedCollection = data
  },
  setPost(state, data) {
    state.selectedPost = data
  },
  setNoteBookId(state, data) {
    state.selectedNoteBookId = data
  },
  delSelectedNote(state) {
    state.selectedNoteId = ''
  },
  delSelectedPost(state) {
    state.selectedPost = ''
  },
  setNote(state, id) {
    state.selectedNoteId = id
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
    state.selectedCollection = ''
    state.selectedPost = ''
    state.selectedNoteBookId = ''
    state.selectedNoteId = ''
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
  },
  storeImageLinks(state, data) {
    state.imageLinks = data
  },
  updataImageLink(state, data) {
    const { url, index } = data
    console.log(data)
    state.pageImages[index].url = url
  }
}

export const getters = {}

// 验证

export const actions = {
  getScrollTop({ state, commit }, data) {
    return state.routerScrollTop[data]
  },
  async toggleImage({ state, commit }, data) {
    let ins = data.index
    const path = data.path
    if (ins < 0) {
      ins = state.imageLinks.length - 1
    }

    if (ins >= state.imageLinks.length) {
      ins = 0
    }
    const ind = await state.pageImages.findIndex((e) => e.path === path)

    commit('updataImageLink', { url: state.imageLinks[ins].url, index: ind })

    return { url: state.imageLinks[ins].url, index: ins }
  },
  async getImage({ state }, path) {
    const ind = await state.pageImages.findIndex((e) => e.path === path)
    console.log(state.pageImages)
    return { url: state.pageImages[ind].url, index: ind }
  },
  nuxtClientInit({ commit }, { req }) {
    const autho = localStorage.getItem('auth._token.local') // or whatever yours is called
    commit('SET_AUTHO', autho)
    // console.log('From nuxtClientInit - ' + autho)
  }
}
