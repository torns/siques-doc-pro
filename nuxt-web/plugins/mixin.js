import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function () {},

  watch: {
    $route: async function () {
      if (this.$route.path !== '/' && this.$route.path !== '/top') {
        window.scrollTo(0, 0)
      }
    },
  },

  methods: {},
})
