import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state =
  process.browser && localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : () => ({
        UserNotExist: true,
        loginFormVisible: false,
        userName: '',
        userId: '',
        otherId: '',
        userCreated: '',
        userAvator: '',
        postLength: '',
        myFollowers: '',
        myFans: '',
        isValid: '',
        personalData: ''
      })

export const mutations = {
  toggleLoginForm(state) {
    state.loginFormVisible = !state.loginFormVisible
  }
}
