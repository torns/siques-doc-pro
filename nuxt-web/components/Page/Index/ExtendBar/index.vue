<template>
  <v-dialog
    id="extend-bar"
    :modal="true"
    :lock-scroll="true"
    :style="`background:${color};${extension}`"
    :append-to-body="true"
    :visible.sync="$attrs.statu"
    :before-close="handleClose"
    :show-close="false"
    fullscreen
  >
    <div slot="title"></div>
    <div class="frosted-glass text-white">
      <slot></slot>
    </div>
  </v-dialog>
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

<style lang="scss"></style>
