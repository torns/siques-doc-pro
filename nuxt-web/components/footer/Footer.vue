<template>
  <div class="pt-5 bg-white">
    <div class="container">
      <el-row :gutter="20" type="flex" class="point">
        <el-col
          :xs="0"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          class="hidden-sm-and-down"
        >
          <div class="title">产品</div>
          <li>热门问答</li>
          <li>热门专栏</li>
          <li>热门课程</li>
          <li>最新活动</li>
          <li>技术圈子</li>
          <li>库工作</li>
          <li>移动客户端</li>
        </el-col>
        <el-col
          :xs="0"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          class="hidden-sm-and-down"
        >
          <div class="title">课程</div>
          <li>Java 开发课程</li>
          <li>Python 开发课程</li>
          <li>前端开发课程</li>
          <li>移动开发课程</li>
        </el-col>
        <el-col
          :xs="0"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          class="hidden-sm-and-down"
        >
          <div class="title">资源</div>
          <li>每周精选</li>
          <li>用户排行榜</li>
          <li>帮助中心</li>
          <li>声望与权限</li>
          <li>社区服务中心</li>
        </el-col>
        <el-col
          :xs="0"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          class="hidden-sm-and-down"
        >
          <div class="title">合作</div>
          <li>关于我们</li>
          <li>广告投放</li>
          <li>职位发布</li>
          <li>讲师招募</li>
          <li>联系我们</li>
          <li>合作伙伴</li>
        </el-col>
        <el-col
          :xs="0"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          class="hidden-sm-and-down"
        >
          <div class="title">关注</div>
          <li>产品技术日志</li>
          <li>社区运营日志</li>
          <li>市场运营日志</li>
          <li>团队日志</li>
          <li>社区访谈</li>
        </el-col>
        <el-col
          :xs="0"
          :sm="4"
          :md="4"
          :lg="4"
          :xl="4"
          class="hidden-sm-and-down"
        >
          <div class="title">条款</div>
          <li>服务条款</li>
          <li>隐私政策</li>
          <li>下载 App</li>
        </el-col>
      </el-row>
    </div>

    <div class="container">
      <el-col
        :xs="0"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="hidden-sm-and-down text-gray fs-sm"
      >
        <el-divider></el-divider>
        <div class="d-flex jc-between">
          <div>
            Copyright © 2018-2019 ShuXie. 当前呈现版本 19.02.27
            <div>浙ICP备 x6号-2 浙公网安备 3301000号</div>
            <div class="mb-4">CDN 存储服务由 又拍云 赞助提供</div>
          </div>
          <div class="text-dark-1">
            <font-awesome-icon :icon="['fab', 'weixin']" class="pr-2" />
            <font-awesome-icon :icon="['fab', 'weibo']" class="pr-2" />
            <font-awesome-icon :icon="['fab', 'github']" class="pr-2" />
            <font-awesome-icon :icon="['fab', 'twitter']" class="pr-2" />
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Footer extends Vue {}
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
}
</style>
