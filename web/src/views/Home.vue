<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo d-flex"
          mode="horizontal"
          :gutter="20"
          router
        >
          <el-menu-item :span="4" index="1">抒写</el-menu-item>

          <el-menu-item :span="4" index="2">发现</el-menu-item>
          <el-menu-item :span="4" index="3">关注</el-menu-item>
          <el-submenu :span="4" index="4">
            <template slot="title">消息</template>
            <el-menu-item index="4-1">评论</el-menu-item>
            <el-menu-item index="4-2">简信</el-menu-item>
            <el-menu-item index="4-3">投稿请求</el-menu-item>
            <el-menu-item index="4-3">喜欢和赞</el-menu-item>
            <el-menu-item index="4-3">关注</el-menu-item>
            <el-menu-item index="4-3">赞赏和付费</el-menu-item>
          </el-submenu>

          <el-menu-item :span="4" index="5">Aa</el-menu-item>
          <el-menu-item :span="4" index="/login">用户</el-menu-item>
          <el-menu-item :span="4" index="/post">写文章</el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss">
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  padding: 0 !important;
}
.el-main {
  // background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
