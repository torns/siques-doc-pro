<template>
  <div>
    <transition
      enter-active-class="animated flipInY"
      leave-active-class="animated slideOutUp"
    >
      <section
        v-if="$attrs.direction"
        class="point d-flex jc-between ai-center shadow-1"
        id="section04"
        @click="btnTop"
      >
        <i class="el-icon-caret-top text-primary" style="margin: 0 auto;"></i>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Back2Top extends Vue {
  btnTop() {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  bottom: 5%;
  right: 5%;
  z-index: 20;
}
</style>
