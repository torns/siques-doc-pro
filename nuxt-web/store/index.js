import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  UserNotExist: true,
  loginFormVisible: false,
  user: '',
  isValid: '',
  personalData: ''
})

export const mutations = {
  toggleLoginForm(state) {
    state.loginFormVisible = !state.loginFormVisible
  },
  toggleUser(state) {
    state.UserNotExist = !state.UserNotExist
  },
  setUserInfo(state, data) {
    state.user = data
  }
}

export const getters = {
  getPostLen(state) {
    return state.user.postLength
  }
}
