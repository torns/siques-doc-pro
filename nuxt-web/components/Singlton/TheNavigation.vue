<template>
  <!-- 其它页面的导航栏 -->
  <div v-if="!isHomepage">
    <div id="navigation" class="visible-xs " style=" z-index: 2;position: absolute;top:0;width:100%">
      <nav class="tabbar">
        <div class="d-flex jc-between ai-center h-100">
          <label v-if="!isMoreClick" class="pl-3 point" for="menu-1" @click="$emit('changestatu', true)">
            <svg>
              <use xlink:href="#settingsIcon" />
            </svg>
          </label>

          <li v-else class="pl-3 point" @click="$emit('changestatu', false)">
            <svg style="height:25px;width: 25px;">
              <use xlink:href="#offsIcon" />
            </svg>
          </li>

          <label class="point" @click="$router.push('/')">
            <img style="height:30px" src="~/static/banner.png" alt="banner" />
          </label>

          <label class="pr-3 point" for="menu-3" @click="$router.push('/search')">
            <svg>
              <use xlink:href="#searchIcon" />
            </svg>
          </label>
        </div>
      </nav>

      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="offsIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
          <circle cx="12" cy="12" r="1.5" />
          <path d="M116.713739 0l367.371131 367.393391-93.005913 93.005913L23.685565 93.050435z" fill="#FF6D00" />
          <path
            d="M598.127304 481.413565L1044.257391 927.565913l-93.005913 93.005913L505.09913 574.441739z"
            fill="#000"
          />
          <path d="M1030.566957 94.45287L105.516522 1019.503304 12.488348 926.497391 937.561043 1.424696z" />
        </symbol>
      </svg>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class TheNavigation extends Vue {
  @Prop()
  isMoreClick

  get isHomepage() {
    return this.$route.path === '/'
  }

  get link() {
    return this.$route.path
  }
}
</script>

<style lang="scss">
#navigation label svg {
  width: 25px;
  height: 25px;
}

.tabbar {
  height: 50px;
}

.show {
  z-index: 10 !important;
}
.hide {
  z-index: 10 !important;
}
</style>
