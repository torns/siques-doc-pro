<template>
  <div class="homepage">
    <div>
      <sq-banner v-if="isHomepage"
        ><v-container style="height: 0;padding:0">
          <v-row no-gutters class=" jc-center">
            <v-col xs="10" sm="8" md="8" lg="8" xl="8">
              <div class="d-flex justify-space-around   reTop" style="position: relative">
                <div style="width: 100%; max-width: 380px">
                  <div class="text-white pb-3 text-center" style="font-size: 32px">从思考, 到创造</div>
                  <div @click.stop>
                    <v-text-field class="mx-4" color="success" hide-details label="Search" append-icon="mdi-magnify">
                      <template v-slot:label>
                        搜索你喜欢的
                      </template>
                    </v-text-field>
                    <div class="text-white text-center pt-5 fs-md">
                      热门搜索：<span @click="$router.push(`/search/vue`)" class="point hoverlink"> </span>
                      <span @click="$router.push(`/search/nuxtjs`)" class="point hoverlink"></span>
                      <span @click="$router.push(`/search/nestjs`)" class="point hoverlink"></span>
                    </div>
                    <!-- <sq-down></sq-down> -->
                  </div>
                </div>
              </div>
            </v-col>
          </v-row></v-container
        ></sq-banner
      >
    </div>
    <v-container style="min-height: 100vh">
      <v-row no-gutters class=" pt-4">
        <v-col cols="24" sm="24" md="24" lg="24" xl="24" style="margin:0 auto;">
          <div>
            <section class="new-title">
              <span>{{ name }}</span>
            </section>

            <div class="news-list-module">
              <div v-for="(post, $index) in posts" :key="$index">
                <article :id="post.id" :class="`item ${post.cover ? '' : 'wire'}`">
                  <section class="row">
                    <section v-if="post.cover" class="news-img point">
                      <router-link :to="`/p/${post.id}`" :title="post.title" tag="a" target="_blank">
                        <img v-lazy="post.cover" alt="cover"
                      /></router-link>
                    </section>
                    <section :class="`${post.cover ? 'news-detail' : 'content'}`">
                      <!-- <section class="item-tag-list d-flex">
                          <div v-for="tag in post.tags" :key="tag.id">
                            <router-link :to="`/t/${tag.id}`" class="tag ellipsis-1" target="_blank" tag="a"
                              ><i class="fa fa-tags"></i> <span>{{ tag.name }}</span></router-link
                            >
                          </div>
                        </section> -->

                      <p class="title">
                        <router-link :to="`/p/${post.id}`" :title="post.title" tag="a" target="_blank">{{
                          post.title
                        }}</router-link>
                      </p>
                      <p class="desc">{{ post.alias }}...</p>
                      <section class="author ">
                        <!-- <nuxt-link :to="`u/${post.user.id}`" class="name" tag="a"
                            ><span>{{ post.user.name + ' ' }}</span>
                          </nuxt-link> -->
                        <span> · </span>
                        <span class="time"> {{ $dayjs(post.created).fromNow() }}</span>
                      </section>
                    </section>
                  </section>
                </article>
              </div>

              <div v-if="loading" class="my-3 text-primary fs-xl">
                <sq-holder :count="8" :show="true"></sq-holder>
              </div>
              <div class="my-3 text-gray text-center">
                <div v-if="noMore">我是有底线的</div>
                <div v-else @click="onload" class="pointer">点击查看更多热文</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- 首页的导航栏 -->
    <sq-extendBar
      @handleClose="$emit('changestatu', false)"
      :statu="$attrs.isMoreClick"
      extension=""
      color="rgba(0, 0, 0, 0.27);"
    >
      <li
        @click="$emit('changestatu', false)"
        style="    text-align: right;
    padding-bottom: 30px;
    padding-right: 10px;"
        class="pl-3"
      >
        <svg style="height: 25px; width: 25px">
          <use xlink:href="#offIcon" />
        </svg>
      </li>
      <a href="#top">
        <!-- 首页左侧边栏 -->

        <!-- <sq-leftBar
          :category="category"
          @handleclick="handleCategory"
          text-color="white"
          color="text-white"
        ></sq-leftBar> -->
      </a>
    </sq-extendBar>

    <sq-footer :topBorder="true"> </sq-footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component } from 'nuxt-property-decorator'
import _ from 'lodash'
import { listIntercep } from '../../plugins/utils.js'
import fetchdata from '../../plugins/fetchdata'
// import leftBar from '@/components/Page/Index/SideBar/leftWay.vue'

import scrolldown from '~/components/Base/BaseScrollDown/index.vue'
import banner from '~/components/Page/Index/IndexBanner.vue'

import placeholder from '~/components/Singlton/ThePlaceholder.vue'
import extendBar from '~/components/Page/Index/ExtendBar/index.vue'
import { getDocList } from '@/api/doc'

@Component({
  components: {
    // 'sq-leftBar': leftBar,
    //
    'sq-down': scrolldown,
    'sq-banner': banner,

    'sq-holder': placeholder,
    'sq-extendBar': extendBar
  }
})
export default class AppPage extends Vue {
  async asyncData() {
    const res = await getDocList({ pageNum: 1, pageSize: 10, params: { type: 'post' } })

    return {
      posts: res.datas.records,
      total: res.datas.total
    }
  }
  page = 1
  count = 10
  total: number = 0
  loading = false
  posts = []
  search = ''

  category: string = 'new'
  name: string = '最近更新'

  get isHomepage() {
    return this.$route.path === '/'
  }

  get noMore(): any {
    return this.count >= this.total
  }

  get disabled(): any {
    return this.loading || this.noMore
  }

  homeTop = 0

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (typeof document != 'undefined') {
        console.log('activated home')
        document.body.scrollTop = vm.$store.state.routerScrollTop['/']
        document.documentElement.scrollTop = vm.$store.state.routerScrollTop['/']
      }
    })
  }

  beforeRouteLeave(to, from, next) {
    console.log('leave')

    // this.homeTop = document.documentElement.scrollTop || document.body.scrollTop || 0

    this.$store.commit('setScrollTop', {
      name: this.$route.path,
      top: document.documentElement.scrollTop || document.body.scrollTop || 0
    })
    next()
  }

  dataSearch() {
    this.$router.push(`/search/${this.search}`)
    this.search = ''
  }

  async onload() {
    this.loading = true
    this.page += 1
    const res = await getDocList({ pageNum: this.page, pageSize: 10, params: { type: 'post' } })

    setTimeout(async () => {
      this.posts = this.posts.concat(res.datas.records)
      this.count += res.datas.records.length
      this.loading = false
    }, 500)
  }
}
</script>

<style lang="scss">
.homepage .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: white;
}
.homepage .theme--light.v-icon {
  color: white;
}
.homepage .theme--light.v-label {
  color: rgb(255, 255, 255, 0.4);
}
</style>
