<template>
  <div class="xs btn-group">
    <div class="flip" @click="btnTop">
      <section>
        <div class="front">
          <i class="el-icon-caret-top "></i>
        </div>
        <div class="back">顶</div>
      </section>
    </div>
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

<style lang="scss"></style>
