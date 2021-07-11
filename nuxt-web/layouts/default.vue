<template>
  <v-app dark>
    <div :id="isHomepage ? 'home' : 'other'">
      <div id="app">
        <canvas id="head_canvas_default" style="display:none"></canvas>
        <IndexMenu></IndexMenu>
        <keep-alive include="AppPage">
          <router-view :key="$route.path"></router-view>
        </keep-alive>
      </div>
    </div>

    <BaseSnackBar></BaseSnackBar>
    <BaseLoading></BaseLoading>
    <v-fade-transition>
      <BaseIndicator v-if="pageLoading"></BaseIndicator>
    </v-fade-transition>

    <!-- 小屏幕导航栏 -->
    <BaseExtendMenu>
      <v-list :dark="isHomepage && true" :light="!isHomepage && true" dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content
            @click="
              () => {
                $router.push(item.href)
                $store.commit('SET_EXTENDMENU', false)
              }
            "
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </BaseExtendMenu>
    <LoginDialog></LoginDialog>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'

@Component({
  computed: mapGetters(['userInfo', 'extendMenu', 'pageLoading'])
})
export default class DefaultLayouts extends Vue {
  /* eslint-disable */

  userInfo
  pageLoading
  items = [
    { title: '知识星球', icon: 'mdi-earth', href: '/collection' },
    { title: '24小时', icon: 'mdi-help-box', href: '/moment' },
    { title: '搜索', icon: 'mdi-view-dashboard', href: '/search' }
  ]
  extendMenu

  get isHomepage() {
    return this.$route.path === '/'
  }

  beforeCreate() {
    this.$store.commit('SET_PAGELOADING', true)
    setTimeout(() => {
      this.$store.commit('SET_PAGELOADING', false)
    }, 600)
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
