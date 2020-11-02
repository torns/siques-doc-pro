<template>
  <el-dialog :style="`background:${color};`" :append-to-body="true" id="extend-bar" :visible.sync="$attrs.statu" fullscreen :before-close="handleClose">
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

  handleClose() {
    this.$emit('handleClose')
  }
}
</script>

<style lang="scss">
#extend-bar .el-dialog {
  background: none;
}
</style>
