import Vue from 'vue'
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  const reg = /<\/?.+?\/?>/g
  value = value.replace(reg, '')
  return value
})
