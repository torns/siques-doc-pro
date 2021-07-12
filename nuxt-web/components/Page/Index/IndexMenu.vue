<template>
  <div class="d-flex w-100 jc-center">
    <nav id="menu" :class="(isHomepage ? '' : 'fixed') + ' xs  w-100'" @click.stop>
      <v-row justify="center">
        <v-col cols="12" md="11" lg="9" xl="8">
          <ul style="  margin: 0 auto" class="d-flex ai-center relative pl-4 pr-3">
            <li class=" xs-flex-1 d-flex ai-center pointer">
              <img
                v-if="isHomepage"
                src="~/static/banner.png"
                alt="Logo"
                style="object-fit: cover; height: 40px"
                @click="$router.push('/')"
              />
              <img
                v-else
                src="~/static/banner1.png"
                alt="Logo"
                style="object-fit: cover; height: 40px"
                @click="$router.push('/')"
              />
            </li>

            <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/' ? 'show_underline' : ''}`">
              <router-link tag="span" to="/">主页</router-link>
            </li>
            <li
              :class="`nav-top-list__li nav-top-list__info xm ${$route.path == '/collection' ? 'show_underline' : ''}`"
            >
              <router-link tag="span" to="/collection">知识星球</router-link>
            </li>

            <li :class="`nav-top-list__li nav-top-list__info xs ${$route.path == '/moment' ? 'show_underline' : ''}`">
              <router-link tag="span" to="/moment">24小时</router-link>
            </li>

            <li class="nav-top-list__rightInfo pr-3">
              <div class="d-flex ai-center">
                <v-menu open-on-hover transition="slide-y-transition" bottom rounded="Large" offset-y>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                      v-bind="attrs"
                      :color="isHomepage ? `white` : 'black'"
                      :class="`${isHomepage ? 'white--text' : ''} px-8`"
                      rounded
                      outlined
                      @click="write"
                      v-on="on"
                    >
                      写稿
                    </v-btn>
                  </template>
                </v-menu>
                <v-menu v-if="loggedIn" open-on-hover color="transparent" transition="slide-y-transition" bottom>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn v-bind="attrs" :class="`${isHomepage ? 'white--text' : ''} ma-5`" text v-on="on">
                      {{ userInfo.username }}
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item color="transparent" link @click="logout">
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

    <nav id="menu" :class="`${breakPoint} visible-xs  w-100`" @click.stop>
      <ul style="height: 60px; margin: 0 auto" class="container d-flex ai-center jc-between relative">
        <!-- 左侧更多按钮 -->
        <li @click="$store.commit('SET_EXTENDMENU', true)">
          <v-btn v-if="trasparent" icon large dark>
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>

          <v-btn v-else icon large>
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </li>

        <li class="favicon d-flex ai-center point pt-1">
          <img
            v-show="trasparent"
            src="~/static/banner.png"
            alt="Logo"
            style="object-fit: cover; height: 36px"
            @click="$router.push('/')"
          />
          <img
            v-show="!trasparent"
            src="~/static/banner1.png"
            alt="Logo"
            style="object-fit: cover; height: 36px"
            @click="$router.push('/')"
          />
        </li>
        <li @click="$router.push('/search')">
          <v-btn icon large dark>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <!-- <v-btn v-else icon large>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: mapGetters(['loggedIn', 'userInfo'])
})
export default class IndexMenu extends Vue {
  get trasparent() {
    return this.$route.path === '/' || this.$route.path.includes('/doc/')
  }

  get isHomepage() {
    return this.$route.path === '/'
  }

  loggedIn
  userInfo
  get breakPoint() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return 'breakPoint'
      case 'sm':
        return 'breakPoint'
      default:
        return ''
    }
  }

  logout() {
    this.$store.dispatch('LoginOut')
  }

  write() {
    if (this.loggedIn) {
      this.$router.push('/docs')
    } else {
      this.$store.commit('toggleLoginForm')
    }
  }
}
</script>

<style lang="scss">
.breakPoint {
  position: absolute;
  z-index: 10 !important;
  background-color: transparent !important;
}
</style>
