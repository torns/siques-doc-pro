import { getUserCollection, getUserDelCollection, listCollection } from '@/api/collection'

export const state = () => ({
  userCollection: [],
  delCollection: [],
  recomendCollection: []
})

export const mutations = {
  SET_COLLECTION: (state, data) => {
    state.userCollection = data
  },
  SET_DELCOLLECTION: (state, data) => {
    state.delCollection = data
  },
  SET_RECOMENTCOLLECTION: (state, data) => {
    state.recomendCollection = data
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
  },
  async getRecomendCollection({ commit }) {
    const res = await listCollection({ pageNum: 1, pageSize: 5 })
    commit('SET_RECOMENTCOLLECTION', res.datas.records)
  }
}
