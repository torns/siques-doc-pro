<template>
  <div class="py-2 d-flex">
    <div class="leftside"></div>
    <div class="main">
      <div class="container">
        <div class="row text-gray d-flex jc-between" style="
    flex-wrap: wrap;">
          <ul class="col-md-2 ai-center">
            <div>产品</div>
            <li>热门问答</li>
            <li>热门专栏</li>
            <li>热门课程</li>
          </ul>
          <ul class="col-md-2">
            <div>产品</div>
            <li>热门问答</li>
            <li>热门专栏</li>
            <li>热门课程</li>
          </ul>
          <ul class="col-md-2">
            <div>产品</div>
            <li>热门问答</li>
            <li>热门专栏</li>
            <li>热门课程</li>
          </ul>
          <ul class="col-md-2">
            <div>产品</div>
            <li>热门问答</li>
            <li>热门专栏</li>
            <li>热门课程</li>
          </ul>
        </div>

        <div class="text-gray">
          <el-divider></el-divider>Copyright © 2018-2019 ShuXie. 当前呈现版本 19.02.27
          <div>浙ICP备 x6号-2 浙公网安备 3301000号</div>
          <div>CDN 存储服务由 又拍云 赞助提供</div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <!-- <div class="pl-2 box1" style="position:relative;left:70px">条款</div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
ul div {
  color: black;
}
</style>
