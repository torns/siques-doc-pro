<template>
  <div id="navigation" v-if="!isHomepage" class="visible-sm visible-xs animated fadeIn" style="position: fixed;z-index: 10;bottom: 0;height:50px;width:100vw">
    <div style="height:inherit" class=" fs-xm d-flex jc-around ai-center border-top bg-white shadow-2">
      <li :class="` ${item.link == link ? 'text-primary' : 'text-gray-1'}`" @click="btnClick(item.link)" v-for="(item, index) in navigation" :key="index">
        <div class="text-center">
          <i :class="`fs-md  fa fa-${item.icon}`"></i>
        </div>
        <div>
          <div>{{ item.name }}</div>
        </div>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class navigation extends Vue {
  navigation = [
    { name: '首页', icon: 'home', link: '/' },
    { name: '笔记', icon: 'book', link: '/n' },
    { name: '专栏', icon: 'wpexplorer ', link: '/blogs' },
    { name: '标签', icon: 'tags', link: '/tags' },
    { name: '回顶部', icon: 'level-up', link: 'top' }
  ]

  get isHomepage() {
    return this.$route.path === '/'
  }

  get link() {
    return this.$route.path
  }

  btnClick(link: any) {
    if (link === 'top') {
      window.scrollTo(0, 0)
    } else {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss" scoped></style>
