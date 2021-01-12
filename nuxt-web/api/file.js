import vue from 'vue'

const fileApi = {
  upload: '/file/upload',
  stsToken: '/file/stsToken'
}
export function fileUpload(parameter) {
  return vue.prototype.$http({
    url: fileApi.upload,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: parameter
  })
}
export function getToken() {
  return vue.prototype.$http({
    url: fileApi.stsToken,
    method: 'get'
  })
}
