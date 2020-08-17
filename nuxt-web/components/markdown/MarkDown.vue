<template>
  <div>
    <div id="editorSection" class="text-left" />
    <input ref="files" @change="uploadFile" style="display: none" type="file" accept="image/*" />
    <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight"> <div v-if="isSaving" class="pt-2 fs-7">保存中...</div> </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import md from './md.js'
import plugin from './plugin.js'

// import { dragUpload } from './plugin.js'
// import Editor from 'tui-editor'
// import defalutConfig from './defalut-config'
// import 'codemirror/lib/codemirror.css'
// import 'tui-editor/dist/tui-editor.css'
// import 'tui-editor/dist/tui-editor-contents.css'
// import 'highlight.js/styles/github.css'

@Component({})
export default class MarkDown extends Vue {
  @Prop()
  height: any

  @Prop()
  selectedPost: any

  editor: any
  loading = false
  paste: any
  value: any = ''
  timer = null
  debounceValue = _.debounce(this.submit, 4000)

  isSaving = false
  changed = false

  @Watch('selectedPost')
  isIdChanged(newval: any, oldval: any) {
    if (newval !== oldval) {
      this.changed = true
      setTimeout(() => {
        this.changed = false
      }, 7000)
    }
  }

  @Watch('value')
  isValueChanged(newval: any, oldval: any) {
    if (!this.changed) {
      if (oldval !== '') {
        this.isSaving = true
        this.debounceValue(this.submit)
      }
    }
  }

  mounted() {
    this.initEditor()
    this.dropUpload()
    this.pasteUpload()
  }

  submit() {
    this.$emit('submit', this.value)
    this.isSaving = false
  }

  pasteUpload() {
    /* eslint-disable */
    var dp: any = document.getElementById('editorSection')
    dp.addEventListener(
      'paste',
      (this.paste = (event: any): any => {
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
              // const reader = new FileReader()
              // reader.onload = (event) => {
              //   // event.target.result 即为图片的Base64编码字符串
              //   this.uploadFile(event.target.result, 'paste')
              //   console.log(event)
              // }
              // reader.readAsDataURL(blob)
              this.uploadFile(blob, 'paste')
            }
          }
        }
      })
    )
  }

  dropUpload() {
    var dp: any = document.getElementById('editorSection')
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

  initEditor() {
    this.editor = md(this.height)
    plugin(this.editor)

    const fileDom: any = this.$refs.files
    // 添加事件
    this.editor.eventManager.addEventType('uploadEvent')
    this.editor.eventManager.listen('uploadEvent', () => {
      fileDom.click()

      // console.log('按下按钮')
      // Do some other thing...
    })
    if (typeof this.timer === 'number') {
      clearTimeout(this.timer)
    }
    this.timer = setInterval(() => {
      this.getContent()
    }, 1000)
  }

  beforeDestroy() {
    this.timer = null
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

      let url
      if (file.type !== 'image/gif') {
        url = res.data.url + '?x-oss-process=style/' + 'post-picture'
      } else {
        url = res.data.url
      }

      this.addImgToMd(url)
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

  addImgToMd(url: any) {
    const editor = this.editor.getCodeMirror()
    const editorHtml = this.editor.getCurrentModeEditor()
    const isMarkdownMode = this.editor.isMarkdownMode()
    if (isMarkdownMode) {
      editor.replaceSelection(`![img](${url})`)
    } else {
      const range = editorHtml.getRange()
      const img = document.createElement('img')
      img.src = `${url}`
      img.alt = 'img'
      range.insertNode(img)
    }
  }

  setContent(value: any) {
    this.editor.setValue(value)
  }

  getContent() {
    this.value = this.editor.getValue()
  }
}
</script>

<style lang="scss">
.te-preview {
  background-color: white;
}
/*!
 * Toast UI Colorpicker
 * @version 2.2.1
 * @author NHNEnt FE Development Team <dl_javascript@nhnent.com>
 * @license MIT
 */
.tui-colorpicker-clearfix {
  zoom: 1;
}
.tui-colorpicker-clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.tui-colorpicker-vml {
  behavior: url('#default#VML');
  display: block;
}
.tui-colorpicker-container {
  width: 152px;
}
.tui-colorpicker-palette-container {
  width: 152px;
}
.tui-colorpicker-palette-container ul {
  width: 152px;
  margin: 0px;
  padding: 0px;
}
.tui-colorpicker-palette-container li {
  float: left;
  margin: 0;
  padding: 0 3px 3px 0;
  list-style: none;
}
.tui-colorpicker-palette-button {
  display: block;
  border: none;
  overflow: hidden;
  outline: none;
  margin: 0px;
  padding: 0px;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.tui-colorpicker-palette-button.tui-colorpicker-selected {
  border: 2px solid #000;
}
.tui-colorpicker-palette-button.tui-colorpicker-color-transparent {
  // barckground-repeat: repeat;
  background-repeat: no-repeat;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAGbaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEzPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CghrN1AAAABzSURBVCgVldKxEYAgDAXQD5VOpLuwgi4jlrTMqF00oOd5Aia/CcV/F4oYOgNlrLjvVyCEVJchBjEC25538PeaWTzRMBLxvIL7UZwFwL06qoA6aoAy+gFfJABvJAQPUoCMlICRRd8BzgHzJL4ok9aJ67l4AK9AxVKhHryUAAAAAElFTkSuQmCC');
}
.tui-colorpicker-palette-hex {
  font-family: monospace;
  display: inline-block;
  *display: inline;
  zoom: 1;
  width: 60px;
  vertical-align: middle;
}
.tui-colorpicker-palette-preview {
  display: inline-block;
  *display: inline;
  zoom: 1;
  width: 12px;
  height: 12px;
  border: 1px solid #ccc;
  border: 1px solid #ccc;
  vertical-align: middle;
  overflow: hidden;
}
.tui-colorpicker-palette-toggle-slider {
  display: inline-block;
  *display: inline;
  zoom: 1;
  vertical-align: middle;
  float: right;
}
.tui-colorpicker-slider-container {
  margin: 5px 0 0 0;
  height: 122px;
  zoom: 1;
}
.tui-colorpicker-slider-container:after {
  content: '';
  display: block;
  clear: both;
}
.tui-colorpicker-slider-left {
  float: left;
  width: 120px;
  height: 120px;
}
.tui-colorpicker-slider-right {
  float: right;
  width: 32px;
  height: 120px;
}
.tui-colorpicker-svg {
  display: block;
}
.tui-colorpicker-slider-handle {
  position: absolute;
  overflow: visible;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  z-index: 2;
  opacity: 0.9;
}
.tui-colorpicker-svg-slider {
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.tui-colorpicker-vml-slider {
  position: relative;
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  overflow: hidden;
}
.tui-colorpicker-vml-slider-bg {
  position: absolute;
  margin: -1px 0 0 -1px;
  top: 0;
  left: 0;
  width: 122px;
  height: 122px;
}
.tui-colorpicker-svg-huebar {
  float: right;
  width: 18px;
  height: 120px;
  border: 1px solid #ccc;
  overflow: visible;
}
.tui-colorpicker-vml-huebar {
  width: 32px;
  position: relative;
}
.tui-colorpicker-vml-huebar-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 121px;
}
</style>
