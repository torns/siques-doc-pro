<template>
  <div>
    <section class="main-footer-waves-area waves-area">
      <svg
        style="background-color: #f7f7f7;"
        class="waves-svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
          ></path>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0"></use>
          <use xlink:href="#gentle-wave" x="48" y="3"></use>
          <use xlink:href="#gentle-wave" x="48" y="5"></use>
          <use xlink:href="#gentle-wave" x="48" y="7"></use>
        </g>
      </svg>
    </section>

    <div>
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        style="background-color:#F7F7F7!important"
        class="hidden-xs-and-down text-gray fs-sm"
      >
        <div class="text-center py-5 mb-2">
          <div class="fs-xm pb-2">
            <sq-cat class="pr-3"></sq-cat>

            <div>
              <a class="text-gray" rel="nofollow" href="http://beian.miit.gov.cn">浙ICP备19035817号</a>
            </div>
            <div class="py-1">
              Copyright
              <i
                id="heart"
                class="el-icon-star-on"
                style="text-shadow: 0px 2px 4px rgba(0,0,0,0.12), 0px 0px 6px rgba(0,0,0,0.04);"
              >
              </i>
              2018-{{ new Date().getFullYear() }} Siques
            </div>
            <div>
              <span style="font-family: fantasy;"> Powered by</span>
              <span>
                <span v-for="(item, index) in techs" :key="index" class="pr-2">
                  <a :href="item.link" rel="nofollow" class="text-primary hover-1 hoverlink">{{ item.name }}</a>
                </span>
              </span>
            </div>
          </div>
          <div style="">
            <!-- <el-popover :close-delay="800" placement="top" width="130" trigger="hover"> -->
            <!-- <img style="width:123px" src="https://cdn.siques.cn/weixin.jpg" alt="" /> -->
            <i slot="reference" class="fa fa-weixin pr-2 text-green point"></i>
            <!-- </el-popover> -->

            <a rel="noopener" href="http://wpa.qq.com/msgrd?v=3&uin=943452349&site=qq&menu=yes" target="_blank">
              <i class="fa fa-qq text-blue pr-2"></i
            ></a>

            <a
              rel="noopener"
              href="https://weibo.com/5496460358/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1"
              target="_blank"
            >
              <i class="fa fa-weibo text-red pr-2"></i
            ></a>
            <a rel="noopener" href="https://github.com/ericheshenghao?tab=repositories" target="_blank">
              <i class="fa fa-github pr-2"></i>
            </a>
          </div>

          <!-- <li>
            {{ '❤ ' + Math.ceil((new Date() - Date.parse('2018-12-15')) / (1 * 24 * 60 * 60 * 1000)) + ' 天' }}
          </li> -->
        </div>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import cat from './Cat/index.vue'

@Component({
  components: {
    'sq-cat': cat
  }
})
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
.main-footer-waves-area .waves-area {
  background-color: #f7f7f7;
}
.waves-area .waves-svg {
  width: 100%;
  height: 10rem;
}

.main-footer-waves-area .waves-svg {
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

svg {
  overflow: hidden;
  vertical-align: middle;
}
.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
  fill: hsla(0, 0%, 100%, 0.7);
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
  fill: hsla(0, 0%, 100%, 0.1);
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
  fill: hsla(0, 0%, 100%, 0.1);
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
  fill: #fff;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 60px;
  }
}

@keyframes heartAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
#heart {
  animation: heartAnimate 1.33s ease-in-out infinite;
}
.el-icon-star-on {
  color: rgb(255, 113, 168) !important;
}
</style>
