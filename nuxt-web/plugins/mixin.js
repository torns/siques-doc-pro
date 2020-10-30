import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function() {},

  watch: {
    $route: function() {
      window.scrollTo(0, 0)
    }
  },

  methods: {}
})
