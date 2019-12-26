<template>
  <div class="home">
    <el-container style="height:100vh">
      <el-header>
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo d-flex"
          mode="horizontal"
          :gutter="20"
          router
        >
          <el-menu-item :span="4">
            <img src="../assets/banner.png" style="object-fit:cover;height:100%;" />
          </el-menu-item>

          <el-menu-item :span="4" index="/">
            <i class="el-icon-discover"></i> 发现
          </el-menu-item>

          <el-menu-item :span="4" index="3">关注</el-menu-item>
          <el-badge :value="3" class="item"></el-badge>
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

          <el-submenu :span="4" index="6">
            <template slot="title">个人信息</template>
            <el-menu-item index="/u">我的主页</el-menu-item>
            <el-menu-item @click="logout">退出登录</el-menu-item>
          </el-submenu>

          <el-menu-item :span="4" index="/login">用户</el-menu-item>
          <el-menu-item :span="4" index="/post">写文章</el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <div class="h-100">
        <router-view :key="$route.path"></router-view>
      </div>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Home extends Vue {
  logout() {
    localStorage.token = "";
  }
}
</script>

<style lang="scss">
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  padding: 0 !important;
  position: relative;
}
.el-main {
  padding: 0 !important;
}
.item {
  right: 17px;
}
</style>
