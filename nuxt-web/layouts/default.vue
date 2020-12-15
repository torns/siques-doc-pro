<template>
  <v-app>
    <BaseSnackBar></BaseSnackBar>
    <transition leave-active-class="animated fadeOut">
      <sq-indicator v-if="show"></sq-indicator>
    </transition>
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
      show: true
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
