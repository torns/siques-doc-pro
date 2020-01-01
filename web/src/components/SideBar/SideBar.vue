<template>
  <div class="sidebar">
    <div class="shadow-1" style="height:174px;background-color:white;"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class SideBar extends Vue {}
</script>

<style lang="scss">
.sidebar {
  width: 300px;
  height: auto;
  background-color: white;
}
</style>
