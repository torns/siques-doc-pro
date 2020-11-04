<template>
  <div class="xm post-navigation">
    <nav id="post-navigation" class="post-navigation">
      <h2 class="screen-reader-text">Post navigation</h2>
      <div class="nav-links d-flex ">
        <a :href="`/p/${posts[0].id}`" class="nav-previous relative over-hidden">
          <div class="nav-bg  " style="height:350px">
            <el-image
              :src="posts[0].cover ? posts[0].cover : link[getRandomUrl()].url"
              style="width: 50vw;height:350px"
              fit="cover"
            ></el-image>
          </div>
          <div class="nav-inside">
            <span class="nav-before">上一篇</span>
            <span class="nav-title">{{ posts[0].title }}</span>
            <span class="nav-date"
              ><time class="published" datetime="2020-01-02"
                >{{ $dayjs(posts[0].created).format('YYYY-MM-DD') }}
              </time></span
            >
          </div>
        </a>
        <a :href="`/p/${posts[1].id}`" class="nav-next relative over-hidden">
          <div class="nav-bg " style="height:350px">
            <el-image
              :src="posts[1].cover ? posts[1].cover : link[getRandomUrl()].url"
              style="width: 50vw;height:350px"
              fit="cover"
            ></el-image>
          </div>
          <div class="nav-inside" style="text-align: right;">
            <span class="nav-before">下一篇</span>
            <span class="nav-title">{{ posts[1].title }}</span>
            <span class="nav-date"
              ><time class="published" datetime="2019-12-29">{{
                $dayjs(posts[1].created).format('YYYY-MM-DD')
              }}</time></span
            >
          </div>
        </a>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import config from '~/plugins/config/website.js'
@Component({})
export default class Navigation extends Vue {
  posts = this.$attrs.data
  link = config.link
  getRandomUrl() {
    return Math.floor(Math.random() * 7)
  }
}
</script>

<style lang="scss" scoped></style>
