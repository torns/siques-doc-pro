<template>
  <div class="xs btn-group">
    <section @click="btnTop" class="point d-flex jc-between ai-center shadow-1">
      <i class="el-icon-caret-top text-primary" style="margin: 0 auto;"></i>
    </section>
    <section
      @click="btnbottom"
      class="point d-flex jc-between ai-center shadow-1"
    >
      <i class="el-icon-caret-bottom text-primary" style="margin: 0 auto;"></i>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Back2Top extends Vue {
  btnTop() {
    window.scrollTo(0, 0)
  }

  btnbottom() {
    const height = document.body.scrollHeight
    window.scrollTo(0, height)
  }
}
</script>

<style lang="scss" scoped>
section {
  width: 40px;
  height: 40px;
  background-color: white;
  // border-radius: 50%;
}
.btn-group {
  position: fixed;
  bottom: 10%;
  right: 0%;
  z-index: 0;
}
</style>
