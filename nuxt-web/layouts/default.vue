<template>
  <v-app>
    <BaseSnackBar></BaseSnackBar>
    <transition leave-active-class="animated fadeOut">
      <sq-indicator v-if="show"></sq-indicator>
    </transition>

    <!-- 导航栏 -->
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
    <nuxt />
  </v-app>
</template>
<script>
import {} from 'nuxt-property-decorator'

export default {
  /* eslint-disable */

  data() {
    return {
      show: true,
      items: [
        { title: '知识星球', icon: 'mdi-earth', href: '/collection' },
        { title: '24小时', icon: 'mdi-help-box', href: '/moment' },
        { title: '搜索', icon: 'mdi-view-dashboard', href: '/search' }
      ]
    }
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        var that = this
        // that.show = true
        setTimeout(() => {
          that.show = false
        }, 0)
      }
    }
  },

  computed: {
    isHomepage() {
      return this.$route.path === '/'
    }
  },

  mounted() {
    setTimeout(() => {
      var that = this
      that.show = false
    }, 800)
  },

  methods: {}
}
</script>
<style lang="scss"></style>
