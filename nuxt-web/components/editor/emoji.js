export function SpecialCharactersEmoji(editor, vue) {
  vue.$store.dispatch('modules/emoji/getEmoji').then((cat) => {
    for (const key in cat) {
      const element = cat[key]
      editor.plugins.get('SpecialCharacters').addItems(key, element)
    }
  })
}
