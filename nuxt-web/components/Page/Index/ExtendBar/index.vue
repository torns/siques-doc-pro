<template>
  <el-dialog
    id="extend-bar"
    :modal="true"
    :lock-scroll="true"
    :style="`background:${color};${extension}`"
    :append-to-body="true"
    :visible.sync="$attrs.statu"
    :before-close="handleClose"
    fullscreen
    :show-close="false"
  >
    <div slot="title"></div>
    <div class="frosted-glass text-white">
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class ExtendBar extends Vue {
  @Prop({
    type: String,
    default: 'black'
  })
  color

  @Prop({
    type: String,
    default: ''
  })
  extension

  handleClose() {
    this.$emit('handleClose')
  }
}
</script>

<style lang="scss">
#extend-bar .el-dialog {
  background: none;
}

#extend-bar .el-dialog__body {
  height: 100vh;
}

#extend-bar {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
// .bg-container {
//   background-repeat: no-repeat;
//   background-attachment: fixed;
//   overflow: hidden;
// }
</style>
