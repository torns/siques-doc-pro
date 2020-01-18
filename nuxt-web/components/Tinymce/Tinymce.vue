<template>
  <div>
    <textarea
      v-model="model.content"
      :id="tinymceId"
      class="tinymce-textarea"
    />
    <el-button @click="submit" class="mt-3" type="primary">发布文章</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Plugins from './plugins'
import Toolbar from './toolbar'
@Component({})
export default class Tinymce extends Vue {
  languageTypeList = {
    en: 'en',
    zh: 'zh_CN',
    es: 'es_MX',
    ja: 'ja'
  }
  height: number = 60
  model: any = []
  body: any = ''

  tinymceId =
    'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
  mounted() {
    if (typeof window !== 'undefined') {
      this.initTinymce()
    }
  }
  submit() {
    this.body = this.getContent()

    this.$emit('submit')
  }
  getContent() {
    return window.tinymce.get(this.tinymceId).getContent()
  }
  setContent(body) {
    setTimeout(() => {
      return window.tinymce.get(this.tinymceId).setContent(body)
    }, 300)
  }
  initTinymce() {
    // 上传问题
    window.http = this.$http
    window.tinymce.init({
      selector: `#${this.tinymceId}`,
      language: this.languageTypeList.zh,
      height: this.height + 'vh',
      plugins: Plugins,
      toolbar: Toolbar,
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',

      images_upload_handler: async (blobInfo, success, failure) => {
        const params = new FormData()
        const filename = blobInfo.blob().name

        params.append('file', blobInfo.blob(), filename)

        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }

        const res = await window.http.post('/files/ali', params, config)
        const url = res.data.url + '?x-oss-process=style/' + 'nest-picture'

        success(url)
      }
    })
  }
}
</script>

<style></style>
