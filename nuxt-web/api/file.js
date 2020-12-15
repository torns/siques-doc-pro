import vue from 'vue'

const fileApi = {
  upload: '/file/upload'
}
export function fileUpload(parameter, config) {
  console.log(config)
  return vue.prototype.$http({
    url: fileApi.upload,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    },

    data: parameter
  })
}
