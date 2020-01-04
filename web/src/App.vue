<template>
  <div id="app" class="font-songti">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
.el-avatar > img {
  object-fit: fill;
  width: 100%;
}
.el-menu-item * {
  vertical-align: unset !important;
}
.article img {
  justify-content: center;
  display: flex;
  max-width: -webkit-fill-available;
  margin: 0.667em 0;
}
</style>
