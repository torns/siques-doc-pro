<template>
  <div>
    <div>
      <input ref="files" @change="uploadFile" style="display: none" type="file" accept="image/*" />
      <div id="editor" class="editor-body bg-white" style="z-index:2;">
        <!-- Tips: Editor.md can auto append a `<textarea>` tag -->
        <!-- <textarea style="display:none;"> </textarea> -->
      </div>
      <div v-if="isSaving" class="pt-2 fs-7">保存中...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import editormd from './editormd.js'

/* eslint-disable */

@Component({})
export default class MarkDown extends Vue {
  @Prop()
  height: any

  @Prop()
  selectedPost: any

  @Prop({
    default: null
  })
  mode: any

  editor: any

  paste: any
  value: any = ''

  //   timer = null

  isSaving = false

  get instance() {
    return this.editor
  }

  // get isDone() {
  //   return this.instance ? this.instance.cm !== undefined : false
  // }

  debounce = _.debounce(this.submit, 4000)
  mounted() {
    this.editor = editormd(this.mode, this.height, this.uploadCallback)

    this.editor.on('load', () => {
      var keyMap = {
        'Ctrl-S': (cm) => {
          if (!this.isSaving) {
            this.$emit('submit', this.value)
          }
        }
      }

      this.editor.addKeyMap(keyMap)
      this.pasteUpload()
      this.dropUpload()
    })

    this.editor.on('resize', () => {
      console.log('resize')
    })

    // this.editor.on('change', () => {
    //   this.value = this.getcontent()
    // })
  }

  uploadCallback(cm, icon, cursor, selection) {
    const fileDom: any = this.$refs.files
    fileDom.click()
  }

  submit() {
    if (this.isSaving) {
      this.$emit('submit', this.value)
      this.isSaving = false
    }
  }

  pasteUpload() {
    /* eslint-disable */
    var dp: any = document.getElementsByClassName('CodeMirror-wrap')[0]
    dp.addEventListener(
      'paste',
      (this.paste = (event: any): any => {
        // console.log(event.clipboardData)
        if (event.clipboardData) {
          // not for ie11  某些chrome版本使用的是event.originalEvent
          const clipboardData = event.clipboardData
          if (clipboardData.items) {
            // for chrome
            const items = clipboardData.items
            const len = items.length
            let blob = null
            // event.preventDefault()

            // 在items里找粘贴的image,据上面分析,需要循环
            for (let i = 0; i < len; i++) {
              if (items[i].type.includes('image')) {
                blob = items[i].getAsFile()
              }
            }

            if (blob !== null) {
              const reader = new FileReader()
              reader.onload = (event) => {
                // event.target.result 即为图片的Base64编码字符串
                this.uploadFile(event.target.result, 'paste')
                console.log(event)
              }
              reader.readAsDataURL(blob)
              this.uploadFile(blob, 'paste')
            }
          }
        }
      })
    )
  }

  dropUpload() {
    var dp: any = document.getElementsByClassName('CodeMirror-wrap').item(0)
    dp.addEventListener('dragover', (e: any) => {
      e.stopPropagation()
      //阻止浏览器默认打开文件的操作
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    })

    //单图上传
    dp.addEventListener('drop', (e: any) => {
      e.stopPropagation()
      //阻止浏览器默认打开文件的操作
      e.preventDefault()

      var files = e.dataTransfer.files
      var file = files[0]

      this.uploadFile(file, 'drop')
    })
  }

  async uploadFile(e: any, type?: any) {
    let file: any
    let target: any
    if (type === 'paste' || type === 'drop') {
      file = e
    } else {
      target = e.target
      file = target.files[0]
    }
    if (!file) {
      this.$notify({
        title: '失败',
        type: 'error',
        message: '不允许的格式'
      })
      return
    }
    const params = new FormData()

    params.append('file', file)

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const loading = this.$loading({
      target: '#editorSection',
      lock: true,
      text: '上传中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    let res
    await setTimeout(async () => {
      res = await this.$http.post('/files/ali', params, config)

      let url = res.data.url.replace('shuxie.oss-cn-hangzhou.aliyuncs.com', 'cdn.siques.cn')

      console.log(file.type)
      if (file.type.indexOf('video') !== -1) {
        this.addVideoToMd(url)
      } else if (file.type == '') {
        this.addFileToMd(url, file.name)
      } else {
        this.addImgToMd(url)
      }

      if (!type) {
        target.value = '' // 这个地方清除一下不然会有问题
      }

      loading.close()
      this.$notify({
        title: '成功',
        type: 'success',
        message: '上传成功'
      })
    }, 1500)
  }

  addVideoToMd(url: any) {
    this.instance.replaceSelection(`<video id="video" autoplay loop muted playsinline src="
  ${url}" >
  </video>`)
  }

  addFileToMd(url: any, name: any) {
    this.instance.replaceSelection(`<a href="${url}" download="${name}">${name}</a>`)
  }

  addImgToMd(url: any) {
    this.instance.replaceSelection(`![img](${url})`)
  }

  timer: any
  setContent(value: any) {
    this.instance.off('change')
    this.isSaving = false
    console.log('切换文章内容')
    // 阻塞获取
    if (this.instance.cm === undefined) {
      setTimeout(() => {
        this.setContent(value)
        return
      }, 300)
    } else {
      this.value = value
      this.instance.setMarkdown(value)

      const myEvent = new Event('resize')

      window.dispatchEvent(myEvent)

      if (typeof this.timer === 'number') {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(this.updateContent, 1000)
    }
  }

  updateContent() {
    this.instance.on('change', () => {
      console.log('更新文章内容')
      this.isSaving = true
      // 若值相等不更新
      this.value = this.editor.getMarkdown()

      this.debounce(this.submit)
    })
  }

  getcontent() {
    return this.editor.getMarkdown()
  }
}
</script>

<style lang="scss">
.editor-body {
  width: 100% !important;
}
</style>
