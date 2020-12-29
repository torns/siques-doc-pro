/* eslint-disable */
/** nuxt.config.js  https://cdn.bootcdn.net/ajax/libs/jsdiff/5.0.0/diff.js*/
export default (oldStr, newStr) => {
  return Diff.diffWordsWithSpace(oldStr, newStr)
}
