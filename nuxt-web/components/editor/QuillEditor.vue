<template>
  <div id="scrolling-container" class="article" style="z-index:100">
    <input
      id="file"
      type="file"
      accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
      style="display: none;"
      multiple="false"
      @change="uploadFile"
    />
    <div id="quill-container" @click="focus"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'
import { hljs } from '@/plugins/utils.js'
import quill from './quill.js'
import delta from './delta'
/* eslint-disable */

@Component({})
export default class QuillEditor extends Vue {
  @Prop({
    type: Function
  })
  upload: Function

  editor: any

  paste: any
  value: any = ''

  change: any = {}

  saving = false

  @Watch('saving')
  valueChanged(newval, oldval) {
    this.$emit('update:saving', newval)
  }

  debounce = _.debounce(this.submit, 4000)
  mounted() {
    this.editor = quill()
    let toolbar = this.editor.getModule('toolbar') //获取工具栏模块

    this.editor.on('text-change', (delta, oldDelta, source) => {
      if (this.change.length() == 0) {
        this.change = this.change.compose(delta)
      } else {
        console.log('更新文章内容')
        this.saving = true
        this.change = this.change.compose(delta)

        this.debounce(this.submit)
      }
    })

    //对工具栏的image添加回调函数覆盖原本的方法
    toolbar.addHandler('image', () => {
      document.getElementById('file').click()
    })

    this.pasteUpload()
    this.dropUpload()
  }

  focus() {
    this.$emit('focus')
  }

  pasteUpload() {
    /* eslint-disable */
    var dp: any = document.getElementById('quill-container')
    dp.addEventListener(
      'paste',
      (this.paste = (event: any): any => {
        console.log(event.clipboardData)
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
              // reader.onload = (event) => {
              //   // event.target.result 即为图片的Base64编码字符串
              //   this.uploadFile(event.target.result, 'paste')
              // }
              reader.readAsDataURL(blob)
              this.uploadFile(blob, 'paste')
            }
          }
        }
      })
    )
  }

  dropUpload() {
    var dp: any = document.getElementById('quill-container')
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
      return
    }
    const params = new FormData()

    params.append('uploadFile', file)

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const loading = this.$loading({ text: '上传中', timeout: 10000 })

    let res
    await setTimeout(async () => {
      res = await this.upload(params, config)

      let url = res.datas.url

      console.log(file.type)
      if (file.type.indexOf('video') !== -1) {
        this.addVideoToMd(url)
      } else if (file.type.includes('image')) {
        this.addImgToMd(url)
      } else {
        this.addFileToMd(url, file.name)
      }

      if (!type) {
        target.value = '' // 这个地方清除一下不然会有问题
      }

      loading.close()
    }, 1500)
  }

  addVideoToMd(url: any) {
    let selection = this.editor.getSelection(true)
    //调用insertEmbed 将图片插入到编辑器
    this.editor.insertEmbed(selection.index, 'video', url)
  }

  addFileToMd(url: any, name: any) {
    let selection = this.editor.getSelection(true)
    //调用insertEmbed 将图片插入到编辑器
    this.editor.insertEmbed(selection.index, 'file', url)
  }

  addImgToMd(url: any) {
    //将图片插入需要获取当前光标的位置，参数为是否要求焦点在编辑器上
    let selection = this.editor.getSelection(true)
    //调用insertEmbed 将图片插入到编辑器
    this.editor.insertEmbed(selection.index, 'image', url)
  }

  setContent(value: any) {
    this.saving = false
    console.log('切换文章内容')

    this.editor.root.innerHTML = value
    this.change = delta()
  }

  submit() {
    if (this.saving && this.change.length() > 0) {
      this.$emit('submit', this.editor.root.innerHTML)
      this.change = delta()
      this.saving = false
    }
  }
}
</script>

<style lang="scss">
/* Tell Quill not to scroll */
#quill-container {
  height: auto;
  min-height: 100%;
  padding: 50px;
}
#quill-container .ql-editor {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
  // overflow-y: visible;
}

/* Specify our own scrolling container */
#scrolling-container {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}

.ql-blockquote {
  width: 20px;
}
</style>
