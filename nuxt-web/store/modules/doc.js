import { getDocTree, getDelDocList } from '@/api/doc'

export const state = () => ({
  docTree: [],
  delDoc: []
})

export const mutations = {
  SET_DOCTREE: (state, data) => {
    state.docTree = data
  },
  SET_DELDOC(state, data) {
    state.delDoc = data
  }
}

export const actions = {
  getDocTree({ commit }, parameter) {
    if (parameter.collectionId !== undefined) {
      return new Promise((resolve) => {
        getDocTree(parameter).then((res) => {
          commit('SET_DOCTREE', res.datas)
          resolve()
        })
      })
    } else {
      commit('SET_DOCTREE', [])
    }
  },
  /** collectionId  */
  async getDelDoc({ commit }, parameter) {
    if (parameter.collectionId !== undefined) {
      const res = await getDelDocList(parameter)
      commit('SET_DELDOC', res.datas)
    } else {
      commit('SET_DELDOC', [])
    }
  },

  updateDocTree({ commit }, parameter) {}
}
