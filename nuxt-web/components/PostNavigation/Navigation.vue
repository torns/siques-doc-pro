<template>
  <div class="xm post-navigation">
    <nav class="post-navigation" id="post-navigation">
      <h2 class="screen-reader-text">Post navigation</h2>
      <div class="nav-links d-flex ">
        <a :href="`/p/${posts[0].id}`" class="nav-previous relative over-hidden">
          <div class="nav-bg  " style="height:350px">
            <el-image style="width: 50vw;height:350px" :src="posts[0].cover ? posts[0].cover : imgLink[0].link" fit="cover"></el-image>
          </div>
          <div class="nav-inside">
            <span class="nav-before">上一篇</span>
            <span class="nav-title">{{ posts[0].title }}</span>
            <span class="nav-date"><time class="published" datetime="2020-01-02">2020-01-02 </time></span>
          </div>
        </a>
        <a :href="`/p/${posts[1].id}`" class="nav-next relative over-hidden">
          <div class="nav-bg " style="height:350px">
            <el-image style="width: 50vw;height:350px" :src="posts[1].cover ? posts[1].cover : imgLink[1].link" fit="cover"></el-image>
          </div>
          <div class="nav-inside" style="text-align: right;">
            <span class="nav-before">下一篇</span>
            <span class="nav-title">{{ posts[1].title }}</span>
            <span class="nav-date"><time class="published" datetime="2019-12-29">2019-12-29 </time></span>
          </div>
        </a>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class Navigation extends Vue {
  posts = this.$attrs.data
  imgLink = [{ link: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/4.jpg' }, { link: 'https://shuxie.oss-cn-hangzhou.aliyuncs.com/public/6.jpg' }]
}
</script>

<style lang="scss" scoped></style>
