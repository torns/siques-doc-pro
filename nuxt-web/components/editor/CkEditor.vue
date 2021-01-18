<template>
  <div>
    <OssFinderWraper ref="ossfinder" @dblclick="execInsertLink"></OssFinderWraper>
    <div id="editor" class="article"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import factory from './factory'
import { UploadAdapter } from './adapter.js'
import displayStatus from './utils'
import { SpecialCharactersEmoji } from './emoji'
/* eslint-disable */

@Component({})
export default class CkEditor extends Vue {
  @Prop()
  readOnly

  editor = null

  value: any = ''
  callback = {
    callback: this.openOssFinder,
    priority: 100
  }
  $refs: any
  openOssFinder() {
    this.$refs.ossfinder.visible = true
  }

  mounted() {
    const editor = factory().then((editor) => {
      this.editor = editor

      if (this.readOnly) {
        editor.isReadOnly = true
      }
      SpecialCharactersEmoji(editor, this)

      // const documentSelection = editor.model.document.selection
      const command = editor.commands.get('ckfinder')
      command._events.execute.callbacks[1] = this.callback

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

  execInsertLink(file) {
    console.log(file)
    this.editor.execute('link', file.url)
    this.$refs.ossfinder.visible = false
  }
}
</script>

<style lang="scss">
#editor {
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
