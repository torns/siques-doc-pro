<template>
  <div class="py-2 bg-white">
    <div class="container">
      <el-row type="flex" class="point" :gutter="20">
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div>产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
        </el-col>
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div>产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
        </el-col>
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div>产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
        </el-col>
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div>产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
        </el-col>
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div>产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
        </el-col>
        <el-col class="hidden-sm-and-down" :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div>产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
        </el-col>
      </el-row>
    </div>

    <div class="container">
      <el-col class="hidden-sm-and-down" :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
        <el-divider></el-divider>Copyright © 2018-2019 ShuXie. 当前呈现版本 19.02.27
        <div>浙ICP备 x6号-2 浙公网安备 3301000号</div>
        <div>CDN 存储服务由 又拍云 赞助提供</div>
      </el-col>
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
.container {
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 36em) {
    width: auto;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 900px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}
</style>
