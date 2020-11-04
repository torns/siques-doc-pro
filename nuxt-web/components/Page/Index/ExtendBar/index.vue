<template>
  <el-dialog
    id="extend-bar"
    :modal="false"
    :lock-scroll="true"
    :style="`background:${color};${extension}`"
    :append-to-body="true"
    :visible.sync="$attrs.statu"
    :before-close="handleClose"
    fullscreen
  >
    <slot></slot>
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
</style>
