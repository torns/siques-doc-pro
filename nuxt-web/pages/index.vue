<template>
  <div :id="isHomepage ? 'home' : ''">
    <!-- <div> -->
    <div id="app" :style="$route.path.includes('/record') || $route.path.includes('/ask') ? 'overflow-y: hidden;height:100vh;' : ''">
      <div style="height:3px;" class="bg-primary"></div>
      <div :style="isHomepage ? '' : 'background-color:#ffffff'" :class="isHomepage ? 'menucover ' : 'shadow-1'">
        <el-menu
          :background-color="isHomepage ? 'transparent' : ''"
          :text-color="isHomepage ? '#ffffff' : ''"
          :active-text-color="isHomepage ? '#ffffff' : ''"
          default-active="/"
          class="d-flex jc-between ai-center container header-menu"
          mode="horizontal"
          style="margin:0 auto;"
          router
        >
          <el-menu-item class="favicon xs-flex-1 d-flex ai-center">
            <img v-if="isHomepage" @click="$router.push('/')" src="~/static/banner.png" alt="Logo" style="object-fit:cover;height:70%;" />
            <img v-else @click="$router.push('/')" src="~/static/banner1.png" alt="Logo" style="object-fit:cover;height:70%;" />
          </el-menu-item>

          <el-menu-item class="xs" index="/">
            <span style="font-weight:600" class=" fs-md" to="/">
              <a href="/" onclick="return false">首页</a>
            </span>
          </el-menu-item>

          <el-menu-item class="xm" index="/q">
            <span class="fs-md"><a href="/q" onclick="return false"> 问答</a></span>
          </el-menu-item>

          <el-menu-item class="xs" index="/blogs">
            <span class="fs-md"><a href="/blogs" onclick="return false"> 专栏</a></span>
          </el-menu-item>

          <el-menu-item class="xs" index="/tags">
            <span class="fs-md"><a href="/tags" onclick="return false">标签</a></span>
          </el-menu-item>
          <el-menu-item class="xs" index="/n">
            <span class="fs-md"><a href="/n" onclick="return false">笔记</a></span>
          </el-menu-item>

          <el-menu-item v-show="this.$store.state.UserNotExist == false" :show-timeout="0" :hide-timeout="0" class="xm " style="padding-left:40px">
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
                    <div class="border-bottom py-1 pl-2">
                      一些关于你的通知
                    </div>
                    <div v-for="(letter, index) in userLetters" :key="index">
                      <div v-if="letter.type !== 'followuser' && letter.content === null" :class="`d-flex py-1 pl-2 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                        <router-link :to="`/u/${letter.from_uid.id}`" tag="div">
                          <div class="hover-4 point pr-1 text-primary " style="white-space: nowrap;">
                            {{ letter.from_uid.name }}
                          </div>
                        </router-link>
                        <div style="white-space: nowrap;" class="pr-1">
                          {{ actionTransFomer(letter) }}
                        </div>
                        <router-link :to="link(letter) + `${letter.to_Post.id}`" tag="div">
                          <div class="point text-primary hoverlink ellipsis-1">
                            {{ letter.to_Post.title }}
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <div v-if="topRadio == 'follow'">
                    <div class="border-bottom py-1 pl-2">
                      他们最近关注了你
                    </div>

                    <div v-for="(letter, index) in userLetters" :key="index">
                      <div v-if="letter.type == 'followuser'" :class="`py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                        <router-link :to="`/u/${letter.from_uid.id}`" tag="span">
                          <span class="ml-2 hover-4 text-primary point pr-1">{{ letter.from_uid.name }}</span> </router-link
                        >关注了你
                      </div>
                    </div>
                  </div>

                  <div v-if="topRadio == 'letter'">
                    <div class="border-bottom py-1 pl-2">
                      他们最近私信了你
                    </div>

                    <div v-for="(letter, index) in userLetters" :key="index">
                      <div v-if="letter.content != null && letter.from_uid !== null" :class="`py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                        <el-popover :content="` ${letter.content + $dayjs(letter.created).format('M月D日 H:MM')}`" placement="bottom" title="私信详情" width="" icon trigger="hover">
                          <router-link slot="reference" :to="`/u/${letter.from_uid.id}`" tag="span">
                            <span class="ml-2 hover-4 text-primary point pr-1">{{ letter.from_uid.name }}</span>
                            私信了你
                          </router-link>
                        </el-popover>
                      </div>
                      <div v-if="letter.from_uid === null">
                        <div :class="`py-1 lh-2 ${letter.is_read === 1 ? '' : 'bg-2'}`">
                          <div class="pl-2">
                            {{ letter.content }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 pt-3"></div>

                  <div></div>
                  <div class=" border-top ">
                    <div class="d-flex jc-between pt-2">
                      <div @click="markedRead" class="point ">
                        全部标记为已读
                      </div>
                      <router-link to="/notification" tag="div" class="point hover-4">查看全部</router-link>
                    </div>
                  </div>
                </div>
                <i slot="reference" class="fa fa-bell-o  fs-xm "> </i>
              </el-popover>
            </el-badge>
          </el-menu-item>

          <el-submenu :popper-class="isHomepage ? 'mysubmenu' : ''" :index="`person`" v-if="$store.state.UserNotExist == false" :show-timeout="0" :hide-timeout="0">
            <template slot="title">
              <el-avatar v-if="this.$store.state.auth.user !== undefined" :size="35" class="shadow-1">
                <img v-if="this.$store.state.auth.user.avator[0].url !== null" :src="this.$store.state.auth.user.avator[0].url" style="background-color:white;" />

                <img v-else src="~/static/avator.jpg" />
              </el-avatar>
            </template>
            <el-menu-item index="/u">
              <span>
                <i class="iconfont icon-me pr-2 mr-1 pl-2 fs-lg"></i>
                我的主页
              </span>
            </el-menu-item>

            <el-menu-item @click="logout"> <i class="fa fa-remove pl-2 pr-3 fs-lg"></i> 退出</el-menu-item>
          </el-submenu>

          <el-submenu :popper-class="isHomepage ? 'mysubmenu' : ''" :index="`store`" :show-timeout="0" :hide-timeout="0" class="xs">
            <template slot="title">
              <el-button type="text">创建</el-button>
            </template>

            <el-menu-item class="write " index="/post">
              <span to="/post">
                <i class="iconfont pl-3 icon-nav2 fs-xm" style="padding-right:11px"></i>
                写文章</span
              >
            </el-menu-item>
            <el-menu-item class="write " index="/ask">
              <span to="/ask"> <i class="iconfont pr-3  pl-3 icon-iconawsquestion fs-xm"></i>提问题 </span>
            </el-menu-item>
            <el-menu-item class="write " index="/record">
              <span to="/record"> <i class="iconfont  pr-3 pl-3 icon-note fs-xm"></i>记笔记 </span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item v-if="$store.state.UserNotExist" @click="$store.commit('toggleLoginForm'), (isRegister = false)">立即登录</el-menu-item>
          <el-menu-item v-if="$store.state.UserNotExist" class="xm">
            <el-button @click="$store.commit('toggleLoginForm'), (isRegister = true)" type="primary">免费注册</el-button>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="h-100">
        <!-- <transition :duration="{ enter: 0, leave: 200 }" appear mode="out-in" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight"> -->
        <router-view :key="$route.path"></router-view>
        <!-- </transition> -->
      </div>
    </div>

    <sq-navigation></sq-navigation>
    <div @click.stop>
      <sq-login @click.stop ref="login"></sq-login>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'nuxt-property-decorator'
import navigation from '~/components/BottomNavigation/navigation.vue'
import login from '~/components/dialog/login.vue'
@Component({
  components: { 'sq-navigation': navigation, 'sq-login': login }
})
export default class Home extends Vue {
  head() {
    return {
      title: '思趣——分享自由的趣味-yahoo'
    }
  }
  isRegister: boolean = false
  topRadio = 'message'
  search = ''
  userLetters = []

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
  overflow-x: hidden !important;
  height: 100vh;
}
</style>
