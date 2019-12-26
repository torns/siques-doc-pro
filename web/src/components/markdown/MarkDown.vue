<template>
  <div>
    <div class="text-left" id="editorSection" />
    <el-button class="mt-3" type="primary" @click="submit">发布文章</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import defalutConfig from "./defalut-config";
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";

import Editor from "tui-editor";

@Component({})
export default class MarkDown extends Vue {
  body: any = "";
  mounted() {
    this.initEditor();
  }
  initEditor() {
    this.editor = new Editor({
      el: document.getElementById("editorSection"),
      initialEditType: "markdown",
      language: "zh_CN",
      height: "80vh",
      ...defalutConfig
    });
  }
  submit() {
    this.body = this.getContent();

    this.$emit("submit");
  }

  setContent(value) {
    this.editor.setValue(value);
  }
  getContent() {
    return this.editor.getValue();
  }
}
</script>

<style>
</style>