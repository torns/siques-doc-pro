<template>
  <el-dialog :modal="false" :lock-scroll="true" :style="`background:${color};${extension}`" :append-to-body="true" id="extend-bar" :visible.sync="$attrs.statu" fullscreen :before-close="handleClose">
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
