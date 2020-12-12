import { getDocTree } from '@/api/doc'

export const state = () => ({
  docTree: []
})

export const mutations = {
  SET_DOCTREE: (state, data) => {
    state.docTree = data
  }
}

export const actions = {
  async getDocTree({ commit }, parameter) {
    const res = await getDocTree(parameter)
    commit('SET_DOCTREE', res.datas)
  }
}
