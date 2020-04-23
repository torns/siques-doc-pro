<template>
  <div class="bg-white">
    <el-divider v-if="topBorder"></el-divider>
    <div class="container pt-4  px-3 bg-white">
      <el-row :gutter="20" type="flex">
        <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">工具</div>
          <li>
            <a
              rel="nofollow"
              target="_blank"
              href="https://typeorm.io/#/connection"
              >TypeOrm</a
            >
          </li>

          <li>
            <a rel="nofollow" target="_blank" href="https://www.nuxtjs.cn/"
              >Nuxt</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN"
              >Element</a
            >
          </li>
          <li>
            <a rel="nofollow" target="_blank" href="www.nestjs.com/">Nest.js</a>
          </li>
          <li>
            <a rel="nofollow" href="https://www.nuxtjs.cn/guide">Nuxt.js</a>
          </li>
        </el-col>
        <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">常用</div>
          <li>
            <a rel="nofollow" target="_blank" href="https://www.bootcdn.cn/"
              >BootCDN</a
            >
          </li>
          <li>
            <a rel="nofollow" target="_blank" href="https://www.jq22.com/"
              >Jquery 插件库</a
            >
          </li>
          <li>
            <a
              target="_blank"
              rel="nofollow"
              href="http://fa5.dashgame.com/#/%E5%9B%BE%E6%A0%87"
              >Font Awesome</a
            >
          </li>
          <li>
            <a rel="nofollow" target="_blank" href="https://www.iconfont.cn/"
              >矢量图标库</a
            >
          </li>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">资源</div>
          <li>
            <a rel="nofollow" target="_blank" href="https://www.canva.cn/"
              >创意设计</a
            >
          </li>
          <li>
            <a rel="nofollow" href="https://www.bookstack.cn/">书栈网</a>
          </li>
          <li>帮助中心</li>
          <li>声望与权限</li>
          <li>服务中心</li>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">合作</div>
          <li>关于我</li>
          <li>广告投放</li>
          <li>职位发布</li>

          <li>联系我们</li>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="title">关注</div>
          <li>技术日志</li>
          <li>运营日志</li>
          <li>
            {{
              '❤ ' +
                Math.ceil(
                  (new Date() - Date.parse('2018-12-15')) /
                    (1 * 24 * 60 * 60 * 1000)
                ) +
                ' 天'
            }}
          </li>
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
        <div class="text-center py-5 mb-2">
          <div class="fs-xm pb-2">
            <div>
              <a rel="nofollow" href="http://beian.miit.gov.cn"
                >浙ICP备19035817号</a
              >
            </div>
            <div class="py-1">Copyright © 2018-2019 Siques .</div>
            <div>
              用到的技术
              <span>
                <span v-for="(item, index) in techs" :key="index" class="pr-2">
                  <a
                    :href="item.link"
                    rel="nofollow"
                    class="text-primary hover-1 hoverlink"
                    >{{ item.name }}</a
                  >
                </span>
              </span>
            </div>
          </div>
          <div class="text-dark-1 ">
            <el-popover
              :close-delay="800"
              placement="top"
              width="130"
              trigger="hover"
            >
              <img style="width:123px" src="../../static/weixin.jpg" alt="" />
              <i
                slot="reference"
                class="fa fa-weixin pr-2 text-green point"
              ></i>
            </el-popover>

            <a
              href="http://wpa.qq.com/msgrd?v=3&uin=943452349&site=qq&menu=yes"
            >
              <i class="fa fa-qq text-blue pr-2"></i
            ></a>

            <a
              href="https://weibo.com/5496460358/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1"
            >
              <i class="fa fa-weibo text-red pr-2"></i
            ></a>
            <a href="https://github.com/ericheshenghao?tab=repositories">
              <i class="fa fa-github pr-2"></i>
            </a>
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

  techs = [
    { name: 'ElementUi', link: 'https://element.eleme.cn/#/zh-CN' },
    { name: 'Node.js', link: 'https://www.nodeapp.cn/N' },
    { name: 'jQuery', link: 'https://www.jquery123.com/' },
    { name: 'Nuxtjs', link: 'https://www.nuxtjs.cn/guide' },
    { name: 'Nestjs', link: 'www.nestjs.com/' }
  ]
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
    // transition: 0.3s;
    &:hover {
      color: #009a61;
      font-weight: 600;
    }
  }
}
.title {
  padding-bottom: 10px;
}
</style>
