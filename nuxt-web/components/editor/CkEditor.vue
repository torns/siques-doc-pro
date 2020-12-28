<template>
  <div id="editor" class="article" @click="$emit('focus')"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import factory from './factory'
import { UploadAdapter } from './upload'
import displayStatus from './utils'
/* eslint-disable */

@Component({})
export default class CkEditor extends Vue {
  @Prop()
  readOnly

  editor = null

  value: any = ''

  mounted() {
    factory().then((editor) => {
      this.editor = editor

      if (this.readOnly) {
        editor.isReadOnly = true
      }
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
      }
      displayStatus(editor, this)
    })
  }

  setContent(value: any, id) {
    console.log('切换文章内容')
    this.editor.docId = id
    this.editor.setData(value)
  }
  beforeDestroy() {
    this.editor.destroy().then(() => {
      console.log('editor destroyed')
    })
  }
}
</script>

<style lang="scss">
#editor {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
  // overflow-y: visible;
}

.ql-blockquote {
  width: 20px;
}
.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
  border: none !important;
  box-shadow: none !important;
}
</style>
