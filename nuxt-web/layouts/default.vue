<template>
  <div>
    <transition leave-active-class="animated fadeOut">
      <sq-indicator v-if="show"></sq-indicator>
    </transition>

    <nuxt />
  </div>
</template>
<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'

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
<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
