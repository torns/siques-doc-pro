import { userLogin } from '@/api/user'

export const state = () => ({
  token: '',
  name: '',
  avatar: '',
  info: {},
  loggedIn: false
})

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, { name, welcome }) => {
    state.name = name
    state.welcome = welcome
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_STATUS: (state, status) => {
    state.loggedIn = status
  }
}

export const actions = {
  async Login({ commit }, userInfo) {
    const res = await userLogin(userInfo)
    if (res.respCode === 1) {
      commit('SET_TOKEN', res.datas.principal.token)
      commit('SET_INFO', res.datas.principal)
      commit('SET_STATUS', true)
    }
  },

  LoginOut({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_STATUS', false)
  }
}
