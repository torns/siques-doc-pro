import { getCollection, getUserDelCollection, pageCollection } from '@/api/collection'

export const state = () => ({
  userCollection: [],
  deletedCollection: [],
  recomendCollection: []
})

export const mutations = {
  SET_COLLECTION: (state, data) => {
    state.userCollection = data
  },
  SET_DELCOLLECTION: (state, data) => {
    state.deletedCollection = data
  },
  SET_RECOMENTCOLLECTION: (state, data) => {
    state.recomendCollection = data
  }
}

export const actions = {
  async getUserCollection({ commit }, id) {
    const { datas } = await getCollection()
    commit('SET_COLLECTION', datas)
    return datas.find((e) => e.id === id)
  },
  async getDelCollection({ commit }) {
    const { datas } = await getUserDelCollection()
    commit('SET_DELCOLLECTION', datas)
  },
  async getRecomendCollection({ commit }) {
    const { datas } = await pageCollection({ pageNum: 1, pageSize: 5 })
    commit('SET_RECOMENTCOLLECTION', datas.records)
  }
}
