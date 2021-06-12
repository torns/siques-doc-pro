<template>
  <div class="homepage">
    <div>
      <IndexBanner
        ><v-container style="height: 0;padding:0">
          <v-row no-gutters class=" jc-center">
            <v-col xs="10" sm="8" md="8" lg="8" xl="8">
              <div class="d-flex justify-space-around   reTop" style="position: relative">
                <div style="width: 100%; max-width: 380px">
                  <div class="text-white pb-3 text-center" style="font-size: 32px">从思考, 到创造</div>
                  <div @click.stop>
                    <v-text-field
                      v-model="search"
                      class="mx-4"
                      color="white"
                      hide-details
                      label="Search"
                      append-icon="mdi-magnify"
                      @keyup.enter.native="$router.push(`/search/${search}`)"
                    >
                      <template v-slot:label>
                        搜索你喜欢的
                      </template>
                    </v-text-field>
                    <div class="text-white text-center py-5 fs-md">
                      热门搜索：<span class="pointer hoverlink" @click="$router.push(`/search/docker`)">docker</span>
                      <span class="pointer hoverlink" @click="$router.push(`/search/nuxtjs`)">nuxtjs</span>
                    </div>
                    <sq-down></sq-down>
                  </div>
                </div>
              </div>
            </v-col> </v-row></v-container
      ></IndexBanner>
    </div>
    <v-container style="min-height: 100vh">
      <v-row no-gutters class=" pt-4">
        <v-col cols="12" sm="12" md="9" xl="6" style="margin:0 auto;width:'100%">
          <div class="news-list-module">
            <div v-for="(doc, $index) in docs" :key="$index">
              <article :id="doc.id" :class="`item ${doc.cover ? '' : 'wire'}`">
                <section class="row">
                  <section v-if="doc.cover" class="news-img point">
                    <router-link :to="`/doc/${doc.id}`" :title="doc.title" target="_blank" tag="a">
                      <v-img :src="doc.cover" lazy contain>
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey"></v-progress-circular>
                          </v-row> </template></v-img
                    ></router-link>
                  </section>
                  <section :class="`${doc.cover ? 'news-detail' : 'content'}`">
                    <p class="title">
                      <router-link :to="`/doc/${doc.id}`" :title="doc.title" target="_blank" tag="a">{{
                        doc.title
                      }}</router-link>
                    </p>
                    <p class="desc">{{ doc.alias }}...</p>
                    <section class="author">
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

            <v-card
              v-intersect="{
                handler: onIntersect,
                options: {
                  threshold: [0, 1, 1.0]
                }
              }"
              class="my-3 elevation-0 text-gray text-center"
            >
              <v-btn v-if="noMore" :disabled="true" text block color="primary">我是有底线的</v-btn>
              <v-btn v-else text class="mt-4" block color="primary">
                加载更多热文
              </v-btn>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <BaseFooter :top-border="true"> </BaseFooter>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import _ from 'lodash'

import scrolldown from '~/components/Base/BaseScrollDown/index.vue'

import placeholder from '~/components/Singlton/ThePlaceholder.vue'
import { getDocPage } from '@/api/doc'

@Component({
  components: {
    'sq-down': scrolldown,
    'sq-holder': placeholder
  }
})
export default class AppPage extends Vue {
  async asyncData() {
    const res = await getDocPage({ pageNum: 1, pageSize: 20, params: { type: 'doc' } })

    return {
      docs: res.datas.records,
      total: res.datas.total
    }
  }

  isIntersecting = false
  onIntersect(entries, observer) {
    // More information about these options
    // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    this.isIntersecting = entries[0].intersectionRatio >= 0.5
  }
  page = 1
  count = 20
  total: number = 0
  loading = false
  docs = []
  search = ''

  head() {
    return {
      title: '思趣网'
    }
  }

  get isHomepage() {
    return this.$route.path === '/'
  }

  get noMore(): any {
    return this.count >= this.total
  }

  get disabled(): any {
    return this.loading || this.noMore
  }

  // homeTop = 0

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
    // this.homeTop = document.documentElement.scrollTop || document.body.scrollTop || 0
    this.$store.commit('setScrollTop', {
      name: this.$route.path,
      top: document.documentElement.scrollTop || document.body.scrollTop || 0
    })
    next()
  }

  @Watch('isIntersecting')
  valueChanged(newval, oldval) {
    if (newval == true && !this.noMore) {
      this.onload()
    }
  }

  async onload() {
    this.loading = true
    this.page += 1
    const res = await getDocPage({ pageNum: this.page, pageSize: 20, params: { type: 'doc' } })

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
</style>
