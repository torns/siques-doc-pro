import vue from 'vue'

const emojiApi = {
  emoji: '/emoji'
}

export function getEmoji() {
  return vue.prototype.$http({
    url: emojiApi.emoji,
    method: 'get'
  })
}
