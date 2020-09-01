<template>
  <el-row :gutter="43" class="pt-5 collection">
    <transition-group name="list-complete" tag="span">
      <el-col class="py-3 pb-4 list-complete-item" v-for="(post, index) in $attrs.data" :key="post.id" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-row class="collection_wrapper w-100 d-flex flex-wrap ">
          <el-col :class="index % 2 == 1 ? 'order-lg-last' : 'order-lg-first'" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="cover point">
              <router-link target="_blank" class="pannel-image point" :to="`/p/${post.id}`">
                <el-image class="hover w-100" style="height:400px;border-radius:20px;" :src="post.collection.cover ? post.collection.cover : link[getRandomUrl()].url" fit="cover"></el-image>
              </router-link>
            </div>
          </el-col>
          <el-col :class="`${index % 2 == 0 ? 'order-lg-first' : 'order-lg-last'} d-flex flex-column jc-center order-lg-first`" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="description   ">
              <div class="pl-3">
                <div class="header py-1  text-gray fs-xm"><i class="fa fa-leaf   pr-2"></i>{{ post.tags[0] ? post.tags[0].name : '' }}</div>
                <router-link target="_blank" class="pannel-image point" :to="`/p/${post.id}`">
                  <h3 class="title pb-2  fs-xll ellipsis-1">{{ post.title }}</h3>
                </router-link>
                <div class="pr-3">
                  <p class="alias pb-2  fs-xm">{{ post.alias }}...</p>
                </div>
                <div class="footer pt-4 d-flex ">
                  <div class="pr-2">
                    <router-link :to="`/u/${post.user.id}`">
                      <el-avatar
                        :size="44"
                        :src="post.user.avator[0] ? post.user.avator[0].url : ''"
                        class="shadow-2 note_avatar"
                        style="background-color: white ;border: 1px solid #de7d7d;padding: 3px;"
                      >
                        <img src="~/static/avator.jpg" />
                      </el-avatar>
                    </router-link>
                  </div>
                  <div class="fs-xs pt-2 text-gray">
                    <div><i class="fa fa-clock-o pr-2"></i>{{ $dayjs(post.created).format('YYYY-MM-DD') }}</div>
                    <div><i class="fa fa-quote-right pr-1"></i> {{ Math.ceil(post.counts / 200) }}分钟阅读</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </transition-group>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import config from '~/plugins/config/website.js'
@Component({})
export default class CollectionPannel extends Vue {
  //  笔记展示面板

  array = []
  link = config.link
  getRandomUrl() {
    return Math.floor(Math.random() * 7)
  }
}
</script>

<style lang="scss">
.note_avatar > img {
  border-radius: 50% !important;
}
.collection {
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
  }
  .list-complete-leave-to {
    // opacity: 0;
  }
  .list-complete-enter,
  .list-complete-leave-to {
    /* .list-complete-leave-active for below version 2.1.8 */
    opacity: 0;
    transform: translateX(800px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
}
</style>
