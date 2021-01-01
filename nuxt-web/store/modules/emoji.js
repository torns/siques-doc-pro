import { getEmoji } from '@/api/emoji'
export const state = () => ({
  emoji: {}
})

export const mutations = {
  SET_EMOJI(state, data) {
    state.emoji = data
  }
}

export const actions = {
  getEmoji({ state, commit }) {
    return new Promise((resolve) => {
      if (Object.keys(state.emoji).length === 0) {
        getEmoji().then((res) => {
          const cat = {}
          for (const key in res.datas) {
            if (cat[res.datas[key].category] === undefined) {
              cat[res.datas[key].category] = []
            }
            const { char } = res.datas[key]
            cat[res.datas[key].category].push({ title: key, character: char })
          }

          resolve(cat)
          commit('SET_EMOJI', cat)
        })
      } else {
        resolve(state.emoji)
      }
    })
  }
}
