import { userLogin, loginByCode } from '~/api/auth'

export const state = () => ({
  token: '',
  name: '',
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
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_STATUS: (state, status) => {
    state.loggedIn = status
  }
}

export const actions = {
  async LoginByCode({ commit }, userInfo) {
    const res = await loginByCode(userInfo)
    if (res.respCode === 1) {
      commit('SET_TOKEN', res.datas.principal.token)
      commit('SET_INFO', res.datas.principal)
      commit('SET_STATUS', true)
    }
    return res
  }
}
