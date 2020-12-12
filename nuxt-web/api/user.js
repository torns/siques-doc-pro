import vue from 'vue'

const userApi = {
  login: '/user/login'
}

export function userLogin(parameter) {
  return vue.prototype.$http({
    url: userApi.login,
    method: 'post',
    data: parameter
  })
}
