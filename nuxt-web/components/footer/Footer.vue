<template>
  <div class="bg-white">
    <el-divider v-if="topBorder"></el-divider>
    <div class="container pt-4  px-3">
      <el-row :gutter="20" type="flex" class="point">
        <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">工具</div>
          <li>
            <a target="_blank" href="https://typeorm.io/#/connection"
              >TypeOrm</a
            >
          </li>

          <li>
            <a target="_blank" href="https://www.nuxtjs.cn/">Nuxt</a>
          </li>
          <li>
            <a target="_blank" href="https://element.eleme.cn/#/zh-CN"
              >Element</a
            >
          </li>
          <li>
            <a target="_blank" href="www.nestjs.com/">Nest.js</a>
          </li>
          <li>
            <a href="https://www.nuxtjs.cn/guide">Nuxt.js</a>
          </li>
        </el-col>
        <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">常用</div>
          <li><a target="_blank" href="https://www.bootcdn.cn/">BootCDN</a></li>
          <li>
            <a target="_blank" href="https://www.jq22.com/">Jquery 插件库</a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://fa5.dashgame.com/#/%E5%9B%BE%E6%A0%87"
              >Font Awesome</a
            >
          </li>
          <li>移动开发课程</li>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">资源</div>
          <li>每周精选</li>
          <li>用户排行榜</li>
          <li>帮助中心</li>
          <li>声望与权限</li>
          <li>社区服务中心</li>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">合作</div>
          <li>关于我们</li>
          <li>广告投放</li>
          <li>职位发布</li>
          <li>讲师招募</li>
          <li>联系我们</li>
          <li>合作伙伴</li>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">关注</div>
          <li>产品技术日志</li>
          <li>社区运营日志</li>
          <li>市场运营日志</li>
          <li>团队日志</li>
          <li>社区访谈</li>
        </el-col>
        <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">条款</div>
          <li>服务条款</li>
          <li>隐私政策</li>
          <li>下载 App</li>
        </el-col>
      </el-row>
    </div>

    <div class="container px-3">
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="hidden-xs-and-down text-gray fs-sm"
      >
        <el-divider></el-divider>
        <div class="d-flex jc-between">
          <div class="pr-3">
            Copyright © 2018-2019 Siques. 当前呈现版本 19.02.27
            <div>浙ICP备 x6号-2 浙公网安备 3301000号</div>
            <div class="mb-4">CDN 存储服务由 又拍云 赞助提供</div>
          </div>
          <div style="flex:20" class="text-dark-1">
            <i class="iconfont icon-xiangmulan-weixinhao pr-2"></i>
            <i class="iconfont icon-weibo pr-2"></i>
            <i class="iconfont icon-github pr-2"></i>
            <i class="iconfont icon-twitter pr-2"></i>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Footer extends Vue {
  @Prop()
  topBorder: any
}
</script>

<style lang="scss" scoped>
.el-col .title {
  color: black;
  font-size: 16px;
  font-weight: 600;
}

li {
  font-size: 14px;
  color: gray;
  padding-top: 3px;
  padding-bottom: 3px;
  a {
    color: gray;
  }
}
.title {
  padding-bottom: 10px;
}
</style>
