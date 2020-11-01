<template>
  <div class="extend-bar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class ExtendBar extends Vue {}
</script>

<style lang="scss" scoped>
.extend-bar {
  width: 100vh;
  height: 100vh;
  position: absolute;
  top: 55px;
  left: 0;
  z-index: 100;
  color: white;
  background-color: black;
}
</style>
