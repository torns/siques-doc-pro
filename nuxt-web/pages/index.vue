<template>
  <div :id="isHomepage ? 'home' : 'other'">
    <div id="app">
      <nav id="menu" @click.stop :class="(isHomepage ? '' : 'fixed') + ' xs  w-100'">
        <v-row justify="center">
          <v-col cols="12" md="11" xl="8" lg="8">
            <ul style="  margin: 0 auto" class="d-flex ai-center relative pl-4 pr-3">
              <li class=" xs-flex-1 d-flex ai-center pointer">
                <img
                  v-if="isHomepage"
                  @click="$router.push('/')"
                  src="~/static/banner.png"
                  alt="Logo"
                  style="object-fit: cover; height: 40px"
                />
                <img
                  v-else
                  @click="$router.push('/')"
                  src="~/static/banner1.png"
                  alt="Logo"
                  style="object-fit: cover; height: 40px"
                />
              </li>

              <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/' ? 'show_underline' : ''}`">
                <router-link tag="span" to="/">主页</router-link>
              </li>
              <li
                :class="
                  `nav-top-list__li nav-top-list__info xm ${$route.path == '/collection' ? 'show_underline' : ''}`
                "
              >
                <router-link tag="span" to="/collection">知识星球</router-link>
              </li>

              <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/moment' ? 'show_underline' : ''}`">
                <router-link tag="span" to="/moment">24小时</router-link>
              </li>

              <li class="nav-top-list__rightInfo ">
                <div class="d-flex ai-center">
                  <v-menu open-on-hover transition="slide-y-transition" bottom rounded="Large" offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :color="isHomepage ? `white` : 'black'"
                        :class="`${isHomepage ? 'white--text' : ''} px-8`"
                        rounded
                        outlined
                      >
                        写稿
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item @click="$router.push('/docs')" link>
                        <v-list-item-title v-text="`写文章`"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-menu
                    v-if="loggedIn"
                    open-on-hover
                    color="transparent"
                    transition="slide-y-transition"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn v-bind="attrs" v-on="on" :class="`${isHomepage ? 'white--text' : ''} ma-5`" text>
                        {{ userInfo.username }}
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item @click="logout" color="transparent" link>
                        <v-list-item-title v-text="`退出登录`"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </nav>

      <nav id="menu" @click.stop class=" visible-xs  w-100">
        <ul style="height: 60px; margin: 0 auto" class="container d-flex ai-center jc-between relative">
          <!-- 左侧更多按钮 -->
          <li @click="$store.commit('SET_EXTENDMENU', true)" class="pl-3">
            <svg style="height: 30px; width: 30px">
              <use xlink:href="#settingsIcon" />
            </svg>
          </li>

          <li class="favicon d-flex ai-center point">
            <img
              v-show="isHomepage"
              @click="$router.push('/')"
              src="~/static/banner.png"
              alt="Logo"
              style="object-fit: cover; height: 36px"
            />
            <img
              v-show="!isHomepage"
              @click="$router.push('/')"
              src="~/static/banner1.png"
              alt="Logo"
              style="object-fit: cover; height: 36px"
            />
          </li>
          <li @click="$router.push('/search')" class="pr-3">
            <svg style="height: 30px; width: 30px">
              <use xlink:href="#searchIcon" />
            </svg>
          </li>
        </ul>
      </nav>

      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="settingsIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
          <path
            d="M159.744 101.888h217.6c51.2 0 76.8 25.6 76.8 76.8v217.6c0 51.2-25.6 76.8-76.8 76.8H159.744c-51.2 0-76.8-25.6-76.8-76.8V178.688c0-51.2 25.6-76.8 76.8-76.8z"
            fill="#D1D1D1"
          />
          <path
            d="M750.592 71.68c136.704 0 204.8 68.096 204.8 204.8s-68.096 204.8-204.8 204.8-204.8-68.096-204.8-204.8c0-136.192 68.608-204.8 204.8-204.8z"
            fill="#997CD8"
          />
          <path
            d="M652.8 581.12H870.4c51.2 0 76.8 25.6 76.8 76.8V875.52c0 51.2-25.6 76.8-76.8 76.8h-217.6c-51.2 0-76.8-25.6-76.8-76.8v-217.6c0-51.2 25.6-76.8 76.8-76.8z"
            fill="#D1D1D1"
          />
          <path
            d="M311.296 607.232L471.04 874.496c12.8 20.992 5.632 48.64-15.36 61.44-7.168 4.096-14.848 6.144-23.04 6.144H113.152c-24.576 0-45.056-19.968-45.056-44.544 0-8.192 2.048-15.872 6.144-23.04l159.744-267.264c12.8-20.992 39.936-28.16 61.44-15.36 6.656 3.584 12.288 8.704 15.872 15.36z"
          />
        </symbol>

        <symbol id="offIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
          <circle cx="12" cy="12" r="1.5" />
          <path d="M116.713739 0l367.371131 367.393391-93.005913 93.005913L23.685565 93.050435z" fill="#FF6D00" />
          <path
            d="M598.127304 481.413565L1044.257391 927.565913l-93.005913 93.005913L505.09913 574.441739z"
            fill="#fff"
          />
          <path d="M1030.566957 94.45287L105.516522 1019.503304 12.488348 926.497391 937.561043 1.424696z" />
        </symbol>

        <symbol id="searchIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 900 1200" fill="currentColor">
          <circle cx="12" cy="12" r="1.5" />
          <path
            d="M799.117225 727.668111A446.399272 446.399272 0 0 0 896.675651 448.449169a51.046313 51.046313 0 1 0-102.165758 0 346.134953 346.134953 0 1 1-39.345152-160.525295 51.046313 51.046313 0 1 0 90.464597-47.462832 448.300711 448.300711 0 1 0-118.035456 558.730412c1.316381 1.828306 2.92529 3.58348 4.534199 5.19239l204.624044 204.624044a51.046313 51.046313 0 0 0 72.181534-72.181534l-204.624044-204.624043a51.558238 51.558238 0 0 0-5.119258-4.5342z"
          />
        </symbol>
      </svg>

      <div class="h-100">
        <!-- <transition :duration="{ enter: 0, leave: 200 }" appear mode="out-in" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight"> -->
        <!-- 页面视图 -->

        <keep-alive exclude="Doc">
          <router-view
            @changestatu="isMoreClick = false"
            :isMoreClick="isMoreClick"
            :key="$route.path"
            style="overflow-x: hidden"
          ></router-view>
        </keep-alive>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import navigation from '~/components/Singlton/TheNavigation.vue'

@Component({
  components: { 'sq-navigation': navigation },
  computed: mapGetters(['userInfo', 'loggedIn', 'extendMenu'])
})
/* eslint-disable */
export default class Home extends Vue {
  asyncData({ params, query, route, store }) {}
  extendMenu
  head() {
    return {
      title: '思趣网'
    }
  }
  userInfo
  loggedIn
  isMoreClick = false

  search = ''

  scrollTop = 0

  @Watch('isMoreClick')
  isMoreClicked(newval: any, oldval: any) {
    if (newval) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
      // document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:hidden;')
      // document.getElementsByTagName('html')[0].setAttribute('style', 'overflow:hidden;')
      // document.getElementById('app').setAttribute('style', 'position:fixed;')
    } else {
      // document.getElementsByTagName('body')[0].removeAttribute('style')
      // document.getElementsByTagName('html')[0].removeAttribute('style')
      // document.getElementById('app').removeAttribute('style')
      // 还原滚动距离
      document.body.scrollTop = this.scrollTop
      document.documentElement.scrollTop = this.scrollTop
    }
  }

  logout() {
    this.$store.dispatch('LoginOut')
  }

  get isHomepage() {
    return this.$route.path === '/'
  }
}
</script>

<style lang="scss">
.item {
  right: 17px;
}

.write {
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
