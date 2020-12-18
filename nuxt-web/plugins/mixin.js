import Vue from 'vue'
/* eslint-disable */
Vue.mixin({
  created: function() {},

  watch: {
    $route: async function() {
      if (this.$route.path !== '/' && this.$route.path !== '/top') {
        window.scrollTo(0, 0)
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('SET_PAGELOADING', false)
    })
  },

  beforeRouteLeave(to, from, next) {
    // this.homeTop = document.documentElement.scrollTop || document.body.scrollTop || 0
    this.$store.commit('SET_PAGELOADING', true)

    next()
  },

  methods: {}
})
