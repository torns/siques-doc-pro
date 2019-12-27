<template>
  <div class="ml-3">
    <div class="shadow-1" style="width:260px;height:174px;background-color:white;">广告加载中</div>
    <div class="shadow-1 mt-2 box1">精读</div>
    <div class="box1 mt-2 shadow-1">推荐阅读</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class SideBar extends Vue {}
</script>

<style lang="scss">
.box1 {
  width: 260px;
  height: auto;
  background-color: white;
}
</style>
