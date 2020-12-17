import vue from 'vue'

const fileApi = {
  upload: '/file/upload'
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
