<template>
  <div class="contanier h-100 d-flex">
    <div class="leftside"></div>
    <div class="main">
      <div class="pt-5">message</div>
    </div>

    <div class="sidebar"></div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class MyPage extends Vue {
  fetchPost() {}
}
</script>

<style lang="scss" scoped>
.contanier {
  text-align: left;
}
.main {
  min-width: 36em;

  height: 100%;
}
.leftside {
  width: 53%;
  height: 100%;
}
.sidebar {
  width: 100%;
  height: 100%;
}
.el-divider--vertical {
  height: inherit;
}
</style>