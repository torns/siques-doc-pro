import { getDocTree, getDocDeleted } from '@/api/doc'

export const state = () => ({
  docTree: [],
  deletedDoc: []
})

export const mutations = {
  SET_DOCTREE: (state, data) => {
    state.docTree = data
  },
  SET_DELETEDDOC(state, data) {
    state.deletedDoc = data
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
  async getDocDeleted({ commit }, parameter) {
    if (parameter.collectionId !== undefined) {
      const res = await getDocDeleted(parameter)
      commit('SET_DELETEDDOC', res.datas)
    } else {
      commit('SET_DELETEDDOC', [])
    }
  }
}
