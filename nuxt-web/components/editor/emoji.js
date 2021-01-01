const custom = [
  { title: 'custom_1', character: '①' },

  { title: 'custom_9', character: '②' },
  { title: 'custom_17', character: '③' },
  { title: 'custom_2', character: '④' },
  { title: 'custom_10', character: '⑤' },
  { title: 'custom_18', character: '⑥' },
  { title: 'custom_3', character: '⑦' },

  { title: 'custom_11', character: '⑧' },
  { title: 'custom_19', character: '⑨' },
  { title: 'custom_4', character: '⑩' },
  { title: 'custom_12', character: '㈠' },
  { title: 'custom_20', character: '㈡' },
  { title: 'custom_5', character: '㈢' },
  { title: 'custom_13', character: '㈣' },
  { title: 'custom_21', character: '㈤' },
  { title: 'custom_6', character: '㈥' },
  { title: 'custom_14', character: '㈦' },
  { title: 'custom_22', character: '㈧' },
  { title: 'custom_7', character: '㈨' },
  { title: 'custom_15', character: '㈩' },

  { title: 'custom_23', character: '⒈' },
  { title: 'custom_8', character: '⒉' },

  { title: 'custom_16', character: '⒊' },

  { title: 'custom_24', character: '⒋' },
  { title: 'custom_25', character: '⒌' },
  { title: 'custom_33', character: '⒍' },
  { title: 'custom_83', character: '⒎' },
  { title: 'custom_26', character: '⒏' },
  { title: 'custom_34', character: '⒐' },
  { title: 'custom_41', character: '⒑' },
  { title: 'custom_27', character: '⒒' },
  { title: 'custom_35', character: '⒓' },
  { title: 'custom_42', character: '⒔' },
  { title: 'custom_28', character: '⒕' },
  { title: 'custom_36', character: '⒖' },
  { title: 'custom_43', character: '⒗' },
  { title: 'custom_29', character: '⒘' },
  { title: 'custom_37', character: '⒙' },
  { title: 'custom_44', character: '⒚' },
  { title: 'custom_30', character: '⒛' },
  { title: 'custom_38', character: '⑴' },
  { title: 'custom_45', character: '⑵' },
  { title: 'custom_31', character: '⑶' },
  { title: 'custom_39', character: '⑷' },
  { title: 'custom_46', character: '⑸' },
  { title: 'custom_32', character: '⑹' },

  { title: 'custom_40', character: '⑺' },

  { title: 'custom_47', character: '⑻' },
  { title: 'custom_48', character: '⑼' },
  { title: 'custom_56', character: '⑽' },
  { title: 'custom_64', character: '⑾' },
  { title: 'custom_49', character: '⑿' },
  { title: 'custom_57', character: '⒀' },
  { title: 'custom_65', character: '⒁' },
  { title: 'custom_50', character: '⒂' },
  { title: 'custom_58', character: '⒃' },
  { title: 'custom_66', character: '⒄' },
  { title: 'custom_51', character: '⒅' },
  { title: 'custom_59', character: '⒆' },
  { title: 'custom_67', character: '⒇' },

  { title: 'custom_63', character: 'Ⅰ' },
  { title: 'custom_71', character: 'Ⅱ' },

  { title: 'custom_72', character: 'Ⅲ' },
  { title: 'custom_76', character: 'Ⅳ' },
  { title: 'custom_79', character: 'Ⅴ' },
  { title: 'custom_73', character: 'Ⅵ' },
  { title: 'custom_77', character: 'Ⅶ' },
  { title: 'custom_80', character: 'Ⅷ' },
  { title: 'custom_74', character: 'Ⅸ' },

  { title: 'custom_78', character: 'Ⅹ' },

  { title: 'custom_81', character: 'Ⅺ' },
  { title: 'custom_75', character: 'Ⅻ' }
]
export function SpecialCharactersEmoji(editor, vue) {
  vue.$store.dispatch('modules/emoji/getEmoji').then((cat) => {
    editor.plugins.get('SpecialCharacters').addItems('custom', custom)
    for (const key in cat) {
      const element = cat[key]
      editor.plugins.get('SpecialCharacters').addItems(key, element)
    }
  })
}
