import vue from 'vue'

const momentApi = {
  momentList: '/doc/findPage'
}

export function getMomentList(parameter) {
  return vue.prototype.$http({
    url: momentApi.momentList,
    method: 'post',
    data: parameter
  })
}
