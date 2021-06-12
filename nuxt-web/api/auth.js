import vue from 'vue'

const userApi = {
  login: '/user/login',
  loginByCode: '/user/login/code',
  verify: '/user/verify'
}

export function userLogin(parameter) {
  return vue.prototype.$http({
    url: userApi.login,
    method: 'post',
    data: parameter
  })
}

export function loginByCode(parameter) {
  return vue.prototype.$http({
    url: userApi.loginByCode,
    method: 'post',
    data: parameter
  })
}

/**
 *
 * @param {authenticate,token,loginCode} parameter
 */
export function verifyAndSendCode(parameter) {
  return vue.prototype.$http({
    url: userApi.verify,
    method: 'get',
    params: parameter
  })
}
