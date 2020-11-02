<template>
  <div :style="`${isMoreClick ? 'overflow-y: hidden!important;' : ''}`" :id="isHomepage ? 'home' : 'other'">
    <div id="app">
      <nav id="menu" @click.stop :class="(isHomepage ? '' : 'fixed') + ' xs  w-100'">
        <ul style="height:60px;margin:0 auto;" class="container d-flex ai-center  relative">
          <li class="favicon xs-flex-1 d-flex ai-center point">
            <img v-if="isHomepage" @click="$router.push('/')" src="~/static/banner.png" alt="Logo" style="object-fit:cover;height:40px;" />
            <img v-else @click="$router.push('/')" src="~/static/banner1.png" alt="Logo" style="object-fit:cover;height:40px;" />
          </li>

          <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/' ? 'show_underline' : ''}`">
            <router-link tag="span" to="/">主页</router-link>
          </li>
          <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/collection' ? 'show_underline' : ''}`">
            <router-link tag="span" to="/collection">专栏</router-link>
          </li>
          <li :class="`nav-top-list__li nav-top-list__info xm ${$route.path == '/tags' ? 'show_underline' : ''}`">
            <router-link tag="span" to="/tags">标签</router-link>
          </li>

          <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/n' ? 'show_underline' : ''}`">
            <router-link tag="span" to="/n">笔记</router-link>
          </li>
          <li class="nav-top-list__rightInfo">
            <div class="d-flex ai-center">
              <div class="write-hover mr-5">
                <!-- <div class="  round_button inline-block mr-4 ">
                  <div>写稿</div>
                </div>
                <div class="nav-bottom-list">
                  <ul class="child-ul d-flex jc-center ai-center pt-1">
                    <router-link tag="li" class="pr-3" to="/post">写文章</router-link>
                    <router-link tag="li" to="/record">记笔记</router-link>
                  </ul>
                </div> -->
                <el-dropdown :show-timeout="0" :hide-timeout="300" @command="handleCommand" class="xs">
                  <!-- <span :class="`${isHomepage ? 'mysubmenu ' : ''}` + 'el-dropdown-link point'" style="font-size:16px;">
                    写稿
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span> -->
                  <div class="  round_button   ">
                    <div>写稿</div>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/post">写文章</el-dropdown-item>
                    <el-dropdown-item command="/record">记笔记</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <el-dropdown :show-timeout="0" :hide-timeout="300" @command="handleCommand" v-if="$store.state.UserNotExist == false" class="xs">
                <span :class="`${isHomepage ? 'mysubmenu ' : ''}` + 'el-dropdown-link point  d-flex ai-center '" style="font-size:16px;">
                  <span>
                    <el-avatar v-if="this.$store.state.auth.user !== undefined" :size="35" class="shadow-1 mr-1">
                      <img
                        v-if="this.$store.state.auth.user.avator[0] != null && this.$store.state.auth.user.avator[0].url !== null"
                        :src="this.$store.state.auth.user.avator[0].url"
                        style="background-color:white;"
                      />

                      <img v-else src="~/static/avator.jpg" /> </el-avatar
                  ></span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu>
                  <el-dropdown-item command="/u">
                    <span>
                      我的主页
                    </span></el-dropdown-item
                  >
                  <el-dropdown-item command="/logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </li>
        </ul>

        <!--

          <el-menu-item v-show="this.$store.state.UserNotExist == false" :show-timeout="0" :hide-timeout="0" class="xm" style="padding-left:40px">
            <el-badge :value="hasNewMessage ? 'new' : null" class="item" type="primary">
              <el-popover :popper-class="`message`" @show="fetchUserLetter" placement="bottom" trigger="click">
                <div class="d-flex flex-column h-100">
                  <el-radio-group @change="change" v-model="topRadio" size="small">
                    <el-radio-button label="message">
                      <i class="fs-sm iconfont icon-desLampidea"></i>
                    </el-radio-button>
                    <el-radio-button label="letter">
                      <i class="fs-sm iconfont icon-message"></i>
                    </el-radio-button>
                    <el-radio-button label="follow">
                      <i class="fs-sm iconfont icon-follow"></i>
                    </el-radio-button>
                  </el-radio-group>

                  <div v-if="topRadio == 'message'" style="width: 350px;overflow-y: auto;">
                    <div class="border-bottom py-1 pl-2">一些关于你的通知</div>
                    <div v-for="(letter, index) in userLetters" :key="index">
                      <div v-if="letter.type !== 'followuser' && letter.content === null" :class="`d-flex py-1 pl-2 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                        <router-link :to="`/u/${letter.from_uid.id}`" tag="div">
                          <div class="hover-4 point pr-1 text-primary" style="white-space: nowrap;">{{ letter.from_uid.name }}</div>
                        </router-link>
                        <div style="white-space: nowrap;" class="pr-1">{{ actionTransFomer(letter) }}</div>
                        <router-link :to="link(letter) + `${letter.to_Post.id}`" tag="div">
                          <div class="point text-primary hoverlink ellipsis-1">{{ letter.to_Post.title }}</div>
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <div v-if="topRadio == 'follow'">
                    <div class="border-bottom py-1 pl-2">他们最近关注了你</div>

                    <div v-for="(letter, index) in userLetters" :key="index">
                      <div v-if="letter.type == 'followuser'" :class="`py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                        <router-link :to="`/u/${letter.from_uid.id}`" tag="span">
                          <span class="ml-2 hover-4 text-primary point pr-1">{{ letter.from_uid.name }}</span> </router-link
                        >关注了你
                      </div>
                    </div>
                  </div>

                  <div v-if="topRadio == 'letter'">
                    <div class="border-bottom py-1 pl-2">他们最近私信了你</div>

                    <div v-for="(letter, index) in userLetters" :key="index">
                      <div v-if="letter.content != null && letter.from_uid !== null" :class="`py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                        <el-popover :content="` ${letter.content + $dayjs(letter.created).format('M月D日 H:MM')}`" placement="bottom" title="私信详情" width icon trigger="hover">
                          <router-link slot="reference" :to="`/u/${letter.from_uid.id}`" tag="span">
                            <span class="ml-2 hover-4 text-primary point pr-1">{{ letter.from_uid.name }}</span>
                            私信了你
                          </router-link>
                        </el-popover>
                      </div>
                      <div v-if="letter.from_uid === null">
                        <div :class="`py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                          <div class="pl-2">{{ letter.content }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 pt-3"></div>

                  <div></div>
                  <div class="border-top">
                    <div class="d-flex jc-between pt-2">
                      <div @click="markedRead" class="point">全部标记为已读</div>
                      <router-link to="/notification" tag="div" class="point hover-4">查看全部</router-link>
                    </div>
                  </div>
                </div>
                <i slot="reference" class="fa fa-bell-o fs-xm"></i>
              </el-popover>
            </el-badge>
          </el-menu-item>
        -->
      </nav>

      <nav v-if="isHomepage" id="menu" style="display:none" @click.stop :class="(isHomepage ? '' : 'fixed') + ' visible-xs  w-100'">
        <ul style="height:60px;margin:0 auto;" class="container d-flex ai-center jc-between relative">
          <!-- 左侧更多按钮 -->
          <li v-if="!isMoreClick" class="pl-3" @click="isMoreClick = !isMoreClick">
            <svg style="height:30px;width: 30px;">
              <use xlink:href="#settingsIcon" />
            </svg>
          </li>

          <li v-else class="pl-3" @click="isMoreClick = !isMoreClick">
            <svg style="height:25px;width: 25px;">
              <use xlink:href="#offIcon" />
            </svg>
          </li>

          <li class="favicon d-flex ai-center point">
            <img @click="$router.push('/')" src="~/static/banner.png" alt="Logo" style="object-fit:cover;height:36px;" />
          </li>
          <li class="pr-3" @click="$router.push('/search')">
            <svg style="height:30px;width: 30px;">
              <use xlink:href="#searchIcon" />
            </svg>
          </li>
        </ul>
      </nav>

      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="settingsIcon" fill="currentColor">
          <path d="M159.744 101.888h217.6c51.2 0 76.8 25.6 76.8 76.8v217.6c0 51.2-25.6 76.8-76.8 76.8H159.744c-51.2 0-76.8-25.6-76.8-76.8V178.688c0-51.2 25.6-76.8 76.8-76.8z" fill="#D1D1D1" />
          <path d="M750.592 71.68c136.704 0 204.8 68.096 204.8 204.8s-68.096 204.8-204.8 204.8-204.8-68.096-204.8-204.8c0-136.192 68.608-204.8 204.8-204.8z" fill="#997CD8" />
          <path d="M652.8 581.12H870.4c51.2 0 76.8 25.6 76.8 76.8V875.52c0 51.2-25.6 76.8-76.8 76.8h-217.6c-51.2 0-76.8-25.6-76.8-76.8v-217.6c0-51.2 25.6-76.8 76.8-76.8z" fill="#D1D1D1" />
          <path
            d="M311.296 607.232L471.04 874.496c12.8 20.992 5.632 48.64-15.36 61.44-7.168 4.096-14.848 6.144-23.04 6.144H113.152c-24.576 0-45.056-19.968-45.056-44.544 0-8.192 2.048-15.872 6.144-23.04l159.744-267.264c12.8-20.992 39.936-28.16 61.44-15.36 6.656 3.584 12.288 8.704 15.872 15.36z"
          />
        </symbol>

        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="offIcon" fill="currentColor">
          <circle cx="12" cy="12" r="1.5" />
          <path d="M116.713739 0l367.371131 367.393391-93.005913 93.005913L23.685565 93.050435z" fill="#FF6D00" />
          <path d="M598.127304 481.413565L1044.257391 927.565913l-93.005913 93.005913L505.09913 574.441739z" fill="#fff" />
          <path d="M1030.566957 94.45287L105.516522 1019.503304 12.488348 926.497391 937.561043 1.424696z" />
        </symbol>

        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 900 1200" id="searchIcon" fill="currentColor">
          <circle cx="12" cy="12" r="1.5" />
          <path
            d="M799.117225 727.668111A446.399272 446.399272 0 0 0 896.675651 448.449169a51.046313 51.046313 0 1 0-102.165758 0 346.134953 346.134953 0 1 1-39.345152-160.525295 51.046313 51.046313 0 1 0 90.464597-47.462832 448.300711 448.300711 0 1 0-118.035456 558.730412c1.316381 1.828306 2.92529 3.58348 4.534199 5.19239l204.624044 204.624044a51.046313 51.046313 0 0 0 72.181534-72.181534l-204.624044-204.624043a51.558238 51.558238 0 0 0-5.119258-4.5342z"
          />
        </symbol>
      </svg>

      <div class="h-100">
        <!-- <transition :duration="{ enter: 0, leave: 200 }" appear mode="out-in" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight"> -->
        <!-- 页面视图 -->
        <router-view @changestatu="isMoreClick = false" :isMoreClick="isMoreClick" :key="$route.path"></router-view>
        <!-- </transition> -->
      </div>
    </div>

    <!-- 其它页面的底部导航栏 -->
    <sq-navigation
      @changestatu="
        (t) => {
          isMoreClick = t
        }
      "
      :isMoreClick="isMoreClick"
    >
      <sq-extendBar extension="bottom: 48px;" color="white" @handleClose="isMoreClick = false" :statu="isMoreClick">
        <!-- 其它页面的弹出栏 -->
        <div>测试</div>
      </sq-extendBar>
    </sq-navigation>

    <!-- 首页的登录弹窗 -->
    <div @click.stop>
      <sq-login ref="login" @click.stop></sq-login>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import navigation from '~/components/Singlton/TheNavigation.vue'
import login from '~/components/Dialog/UserLogin.vue'
import click from '~/plugins/click.js'
import extendBar from '~/components/Page/Index/ExtendBar/index.vue'
@Component({
  components: { 'sq-navigation': navigation, 'sq-login': login, 'sq-extendBar': extendBar }
})
/* eslint-disable */
export default class Home extends Vue {
  asyncData({ params, query, route, store }) {
    const http = Vue.prototype.$http
    return {}
  }

  head() {
    return {
      title: '思趣网'
      // script: []
    }
  }

  getScrollData = true
  isRegister: boolean = false
  isMoreClick = false
  topRadio = 'message'
  search = ''
  userLetters = []

  @Watch('isMoreClick')
  isMoreClicked(newval: any, oldval: any) {
    if (newval) {
      document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden!important')
    } else {
      if (document.getElementsByTagName('body')[0].getAttribute('style') != null) {
        document.getElementsByTagName('body')[0].removeAttribute('style')
      }
    }
  }

  @Watch('isRegister')
  isStatuChnanged(newval: any, oldval: any) {
    const login: any = this.$refs.login
    if (newval) {
      login.isRegister = true
    } else {
      login.isRegister = false
    }
  }

  actionTransFomer(action: any) {
    if (action.to_Post !== null && action.to_Post.type === 'question' && action.type === 'commentpost') {
      return '评论了问题'
    } else if (action.to_Post !== null && action.to_Post.type === 'note') {
      return '发布了笔记'
    } else {
      switch (action.type) {
        case 'likepost':
          return '点赞了文章'
        case 'followque':
          return '关注了问题'

        case 'followuser':
          return '关注了用户'
        case 'commentpost':
          return '评论了文章'

        case 'createpost':
          return '发布了文章'

        case 'adoptanswer':
          return '采纳了答案'
        case 'bookmarkpost':
          return '收藏了文章'
        case 'privateletter':
          return '私信了'
        default:
          break
      }
    }
  }

  link(action: any) {
    if (action.to_Post.type === 'question') {
      return '/q/'
    } else if (action.to_Post.type === 'note') {
      return '/n/'
    } else {
      switch (action.type) {
        case 'likepost':
          return '/p/'
        case 'followque':
          return '/q/'
        case 'followuser':
          return '关注了用户'
        case 'privateletter':
          return '私信了用户'
        case 'commentpost':
          return '/p/'
        case 'createpost':
          return '/p/'
        case 'adoptanswer':
          return '/q/'
        case 'bookmarkpost':
          return '/p/'
        default:
          break
      }
    }
  }

  get isHomepage() {
    return this.$route.path === '/'
  }

  get hasNewMessage() {
    let hasNew = false
    this.userLetters.map((e: any) => {
      if (e.is_read !== 1) {
        hasNew = true
      }
    })
    return hasNew
  }

  get isUser() {
    return !this.$store.state.UserNotExist
  }

  mounted() {
    setTimeout(() => {
      if (this.isUser) {
        this.fetchUserLetter()
      }
    }, 300)
    setTimeout(() => {
      click()
    }, 2000)
    this.changeMenu()
  }

  changeMenu() {
    // const ref: any = this.$refs.menu
    // ref._computedWatchers.hoverBackground = null
  }

  handleCommand(command) {
    switch (command) {
      case '/logout':
        this.logout()
        break

      default:
        this.$router.push(command)
        break
    }
  }

  async fetchUserLetter() {
    const res = await this.$http.get(`/notification/${this.$store.state.auth.user.id}`)
    this.userLetters = res.data
  }

  async markedRead() {
    if (this.isUser) {
      await this.$http.get(`/notification/${this.$store.state.auth.user.id}/marked`)
      this.userLetters.map((e: any) => {
        e.is_read = 1
      })
    }
  }

  logout() {
    const ref: any = this.$refs.login

    ref.logout()
  }

  change(e: any) {}
}
</script>

<style lang="scss">
.item {
  right: 17px;
}

// .el-popover {
//   padding: 0 !important;
// }

.el-menu-item * {
  vertical-align: unset !important;
}
.el-menu-item:nth-child(1) {
  padding-left: 10px !important;
}

#home .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
#home .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #009a61;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #009a61;
}

#home .el-menu--horizontal > .el-menu-item {
  color: #ffffff;
}

.el-popover {
  &.message {
    height: 440px !important;
    .el-radio-button__inner {
      padding-left: 50px !important;
      padding-right: 50px !important;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
    }
  }
}

.write {
  @media (max-width: 768px) {
    display: none;
  }
}

//首页红点
.el-badge__content.is-fixed {
  top: 18px !important;
  right: 11px !important;
}

.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}

#home {
  overflow-y: auto;
  // overflow-x: hidden !important;
  height: 100vh;
}
</style>
