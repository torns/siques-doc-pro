<template>
  <div v-if="$attrs.show ? $attrs.show : false">
    <div v-for="i in $attrs.count ? $attrs.count : 5" :key="i" class="ui placeholder">
      <div class="header"></div>
      <div class="line"></div>
      <div class="short line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class PlaceHolder extends Vue {}
</script>

<style lang="scss" scoped></style>
