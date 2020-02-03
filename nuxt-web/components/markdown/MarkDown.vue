<template>
  <div>
    <div id="editorSection" class="text-left" />
    <input
      ref="files"
      @change="uploadFile"
      style="display: none"
      type="file"
      accept="image/*"
    />
    <div class="mt-2">
      <el-button @click="submit" size="mini" type="primary">{{
        $attrs.name
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import md from './md.js'
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
  body: any = ''
  editor: any
  win: any = window
  mounted() {
    this.initEditor()
  }
  initEditor() {
    // window.editor = this.editor
    this.editor = md(this.height)
    // 获取编辑器上的功能条
    const toolbar = this.editor.getUI().getToolbar()
    const fileDom: any = this.$refs.files
    // 添加事件
    this.editor.eventManager.addEventType('uploadEvent')
    this.editor.eventManager.listen('uploadEvent', () => {
      fileDom.click()
      // console.log('按下按钮')
      // Do some other thing...
    })
    // 添加自定义按钮 第二个参数代表位置，不传默认放在最后
    toolbar.addButton(
      {
        name: 'customize',
        className: 'upload-img',
        event: 'uploadEvent',
        tooltip: '插入图片'
        // eslint-disable-next-line
        // $el: $(
        //   '<button class="custom-button fa fa-image" style="font-size: 14px;color: #000">123</button>'
        // )
      },
      15
    )
  }
  submit() {
    this.body = this.getContent()

    this.$emit('submit', this.body)
  }

  async uploadFile(e: any) {
    const target = e.target
    const file = target.files[0]
    const params = new FormData()

    params.append('file', file)

    // console.log(params)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const res = await this.$http.post('/files/ali', params, config)

    const url = res.data.url + '?x-oss-process=style/' + 'nest-picture'
    this.addImgToMd(url)
    target.value = '' // 这个地方清除一下不然会有问题
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
    return this.editor.getValue()
  }
}
</script>

<style lang="scss">
.te-preview {
  background-color: white;
}
</style>
