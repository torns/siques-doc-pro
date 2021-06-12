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
        const { datas } = getEmoji()
        const cat = {}
        for (const key in datas) {
          if (cat[datas[key].category] === undefined) {
            cat[datas[key].category] = []
          }
          const { char } = datas[key]
          cat[datas[key].category].push({ title: key, character: char })
        }

        resolve(cat)
        commit('SET_EMOJI', cat)
      } else {
        resolve(state.emoji)
      }
    })
  }
}
