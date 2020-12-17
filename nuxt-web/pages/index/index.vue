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
                    <v-text-field
                      @keyup.enter.native="$router.push(`/search/${search}`)"
                      v-model="search"
                      class="mx-4"
                      color="white"
                      hide-details
                      label="Search"
                      append-icon="mdi-magnify"
                    >
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
        <v-col cols="12" sm="12" md="9" xl="6" style="margin:0 auto;width:'100%">
          <div class="new-title">
            <span>{{ name }}</span>
          </div>

          <div class="news-list-module">
            <div v-for="(doc, $index) in docs" :key="$index">
              <article :id="doc.id" :class="`item ${doc.cover ? '' : 'wire'}`">
                <section class="row">
                  <section v-if="doc.cover" class="news-img point">
                    <router-link :to="`/doc/${doc.id}`" :title="doc.title" tag="a">
                      <img v-lazy="doc.cover" alt="cover"
                    /></router-link>
                  </section>
                  <section :class="`${doc.cover ? 'news-detail' : 'content'}`">
                    <!-- <section class="item-tag-list d-flex">
                          <div v-for="tag in doc.tags" :key="tag.id">
                            <router-link :to="`/t/${tag.id}`" class="tag ellipsis-1" target="_blank" tag="a"
                              ><i class="fa fa-tags"></i> <span>{{ tag.name }}</span></router-link
                            >
                          </div>
                        </section> -->

                    <p class="title">
                      <router-link :to="`/doc/${doc.id}`" :title="doc.title" tag="a">{{ doc.title }}</router-link>
                    </p>
                    <p class="desc">{{ doc.alias }}...</p>
                    <section class="author ">
                      <!-- <nuxt-link :to="`u/${doc.user.id}`" class="name" tag="a"
                            ><span>{{ doc.user.name + ' ' }}</span>
                          </nuxt-link> -->
                      <span> · </span>
                      <span class="time"> {{ $dayjs(doc.created).fromNow() }}</span>
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
        </v-col>
      </v-row>
    </v-container>

    <sq-footer :topBorder="true"> </sq-footer>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component } from 'nuxt-property-decorator'
import _ from 'lodash'

import scrolldown from '~/components/Base/BaseScrollDown/index.vue'
import banner from '~/components/Page/Index/IndexBanner.vue'
import placeholder from '~/components/Singlton/ThePlaceholder.vue'
import { getDocList } from '@/api/doc'

@Component({
  components: {
    // 'sq-leftBar': leftBar,
    //
    'sq-down': scrolldown,
    'sq-banner': banner,

    'sq-holder': placeholder
  }
})
export default class AppPage extends Vue {
  async asyncData() {
    const res = await getDocList({ pageNum: 1, pageSize: 10, params: { type: 'post' } })

    return {
      docs: res.datas.records,
      total: res.datas.total
    }
  }
  page = 1
  count = 10
  total: number = 0
  loading = false
  docs = []
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
      this.docs = this.docs.concat(res.datas.records)
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
.homepage .theme--light.v-input input,
.theme--light.v-input textarea {
  color: white;
}

// .theme--light.v-list {
//   background: #ffffff00;
//   color: white;
// }
</style>
