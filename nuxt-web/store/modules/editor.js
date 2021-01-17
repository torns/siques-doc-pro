export const state = () => ({
  editorSideBar: true
})

export const mutations = {
  SET_SIDEBAR(state) {
    state.editorSideBar = !state.editorSideBar
  }
}

export const actions = {}
