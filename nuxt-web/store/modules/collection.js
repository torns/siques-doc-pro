import { getUserCollection, getUserDelCollection } from '@/api/collection'

export const state = () => ({
  userCollection: [],
  delCollection: []
})

export const mutations = {
  SET_COLLECTION: (state, data) => {
    state.userCollection = data
  },
  SET_DELCOLLECTION: (state, data) => {
    state.delCollection = data
  }
}

export const actions = {
  async getUserCollection({ commit }) {
    const res = await getUserCollection()
    commit('SET_COLLECTION', res.datas)
  },
  async getDelCollection({ commit }) {
    const res = await getUserDelCollection()
    commit('SET_DELCOLLECTION', res.datas)
  }
}
