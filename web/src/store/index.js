import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) : {
    UserNotExist: true,
    loginFormVisible: false,
    userName: "",
    userId: "",
    otherId: "",
    userCreated: "",
    userAvator: "",
    postLength: "",
    myFollowers: "",
    myFans: "",
    isValid: "",
    personalData: ""
  },
  mutations: {
    setTrue(state) {
      state.loginFormVisible = true
    },
    setFalse(state) {
      state.loginFormVisible = false
    }
  },
  actions: {
    setTrueFun(context) {
      context.commit("setTrue")
    },
    setFalseFun(context) {
      context.commit("setFalse")
    }
  },
  modules: {
  }
})
