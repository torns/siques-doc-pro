export const state = () => ({
  loadMsg: {
    loading: false
  },
  notifyMsg: {
    loading: false
  }
})

export const mutations = {
  SET_LOADING(state, parameter) {
    state.loadMsg = Object.assign({ loading: true }, parameter)
  },
  STOP_LOADING(state) {
    state.loadMsg.loading = false
  },
  SET_NOTIFY(state, parameter) {
    state.notifyMsg = Object.assign({ loading: true }, parameter)
  },
  STOP_NOTIFY(state) {
    state.notifyMsg.loading = false
  }
}

export const actions = {
  handleLoading({ state, commit }, data) {
    commit('SET_LOADING', data)

    setTimeout(() => {
      commit('STOP_LOADING')
    }, data.timeout || 10000)
  },
  handleNotify({ state, commit }, data) {
    commit('SET_NOTIFY', data)

    setTimeout(() => {
      commit('STOP_NOTIFY')
    }, data.timeout || 10000)
  }
}
