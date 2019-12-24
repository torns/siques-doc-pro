<template>
  <div class="text-left" id="editorSection" />
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
  mounted() {
    this.initEditor();
  }
  initEditor() {
    this.editor = new Editor({
      el: document.getElementById("editorSection"),
      initialEditType: "markdown",
      language: "zh_CN",
      height: "60vh",
      ...defalutConfig
    });
  }

  setValue(value) {
    this.editor.setValue(value);
  }
  getValue() {
    return this.editor.getValue();
  }
}
</script>

<style>
</style>