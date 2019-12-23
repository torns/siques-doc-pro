<template>
  <div id="editorSection" />
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import defalutConfig from "./defalut-config";

@Component({})
export default class MarkDown extends Vue {
  initEditor() {
    this.editor = new Editor({
      el: document.getElementById("editorSection"),
      ...defalutConfig
    });
  }
}
</script>

<style>
</style>