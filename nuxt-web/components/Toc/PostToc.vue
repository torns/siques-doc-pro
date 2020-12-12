<template>
  <div class="sidebar">
    <div id="toc">
      <div class=" py-3 text-white" style="overflow-y: unset; min-height:100px;width:250px">
        <div style="font-size: initial;">
          <!-- 滚动激活区域 -->

          <!-- <div class="toc-title">{{ title }}</div> -->
          <!-- <nav id="post-toc" v-scroll-spy-active class="nav d-flex flex-column"></nav> -->
          <!-- <el-divider></el-divider> -->

          <!-- <div v-for="post in collectionPosts" :key="post.id">
            <router-link :to="`/p/${post.id}`" :class="`point ${post.title == title ? 'title-active' : ''}`" tag="a">{{
              post.title
            }}</router-link> -->
          <nav id="post-toc" v-scroll-spy-active class="nav d-flex flex-column"></nav>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class TocBar extends Vue {
  @Prop({
    type: String,
    default: '',
    required: false
  })
  title

  @Prop({
    type: Array,
    default: [],
    required: false
  })
  collectionPosts

  mounted() {}
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 250px;
  height: auto;
}
#toc .title-active {
  color: #1bbc8c !important;
}

#toc a {
  color: #9e9e9e;
  font-weight: 600;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  padding: 2px 0;
}
</style>
