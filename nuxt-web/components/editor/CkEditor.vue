<template>
  <div id="editor" class="article" @click="$emit('focus')"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

import factory from './factory'
import { UploadAdapter } from './upload'
import displayStatus from './utils'
/* eslint-disable */

@Component({})
export default class CkEditor extends Vue {
  @Prop()
  readOnly

  editor: any = null

  value: any = ''

  mounted() {
    const promise = factory()
    promise.then((editor) => {
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
    console.log(this.isPromise(this.editor))
    console.log('切换文章内容')
    this.editor.docId = id
    this.editor.setData(value)
  }

  isPromise(obj) {
    return (
      !!obj && //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
      (typeof obj === 'object' || typeof obj === 'function') && // 初始promise 或 promise.then返回的
      typeof obj.then === 'function'
    )
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
