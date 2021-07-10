import vue from 'vue'

const userApi = {
  loginByCode: '/user/login',
  sendCode: '/user/login/sendCode',
  userExist: '/user/exist'
}

export function loginByCode(parameter) {
  return vue.prototype.$http({
    url: userApi.loginByCode,
    method: 'post',
    data: parameter
  })
}

export function checkExist(parameter) {
  return vue.prototype.$http({
    url: userApi.userExist,
    method: 'get',
    params: parameter
  })
}

/**
 *
 * @param {authenticate,token,loginCode} parameter
 */
export function sendCode(parameter) {
  return vue.prototype.$http({
    url: userApi.sendCode,
    method: 'get',
    params: parameter
  })
}
