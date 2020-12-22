import { fileUpload } from '@/api/file'
export class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this.uploadFile(file, resolve)
        })
    )
  }

  async uploadFile(file, resolve) {
    // 上传文件
    const params = new FormData()
    params.append('uploadFile', file)
    const res = await fileUpload(params)
    resolve({
      default: res.datas.url
    })
  }

  // Aborts the upload process.
  abort() {
    // Reject the promise returned from the upload() method.
    // server.abortUpload()
  }
}
