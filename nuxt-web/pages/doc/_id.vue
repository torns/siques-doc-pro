<template>
  <v-main id="domain">
    <IndexMenu> </IndexMenu>
    <DocSideMenu v-if="docTree.length > 0" :doc-tree="docTree" :doc="doc" @selectDoc="selectDoc"> </DocSideMenu>
    <div
      class="absolute d-flex jc-center flex-column ai-center "
      style="z-index:5!important; width: 80%;top:11vh;left:10%;"
    >
      <h1 style="text-align: center;">
        <div class="text-white py-2 lh-5">{{ doc.title }}</div>
      </h1>

      <div class="d-flex py-1 ai-center">
        <div class="d-flex fs-xs ai-center pt-1 text-white">
          <v-icon small color="lime" class="pr-2">
            mdi-bullseye-arrow
          </v-icon>

          {{ $dayjs(doc.created).format('YYYY.MM.DD HH:MM') }}

          <v-icon small color="pink lighten-4" class="px-2">
            mdi-comment-eye
          </v-icon>

          {{ doc.views }}

          <v-icon class="px-2 pointer" @click="toEdit" small v-if="isOwner && show" color="orange">
            mdi-pencil
          </v-icon>
          <span v-if="isOwner && show" class="pointer" @click="toEdit">编辑</span>
        </div>
      </div>
      <div class="tag d-flex ai-baseline mb-3">
        <div class="text-white fs-xs">阅读约 {{ Math.ceil(doc.counts / 275) }} 分钟</div>
      </div>
    </div>

    <div class="postMask" style="height:32vh;backdrop-filter: blur(20px);"></div>

    <div class="post-blur">
      <div class=" relative ">
        <v-img :src="doc.cover" style="height:32vh;"> </v-img>
      </div>
    </div>
    <div style="overflow-x: hidden;" class="post_container  pb-3">
      <v-row no-gutters>
        <v-col xs="12" sm="12" md="12" lg="12" xl="12">
          <article id="article" class=" bg-white ">
            <div>
              <div v-if="doc.title" style="padding: 1.1rem;">
                <!-- 滚动监听区域 -->
                <div id="doc-content" v-scroll-spy v-highlight class="article ck-content" v-html="doc.body"></div>
                <div class="text-primary mt-3 fs-xs">
                  <!-- 阅读：{{ doc.views > 1000 ? (doc.views / 1000).toFixed(1) + 'k' : doc.views }}
                    <span>.</span> -->
                  <span class="pr-2">字数：{{ doc.counts }}</span>
                  {{ '发布于 ' + $dayjs(doc.created).fromNow() }}
                </div>
              </div>
            </div>
          </article>
        </v-col>
      </v-row>

      <div class="px-2" id="gitalk-container"></div>
    </div>
    <PostToc :title="doc.title"></PostToc>

    <BaseFooter></BaseFooter>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import { hljs, copy, gitTalk, fancybox } from '@/plugins/utils.js'
import { mapGetters } from 'vuex'
import { getDocDetail, getDocTree } from '@/api/doc'
import tocjs from '~/plugins/toc.js'

@Component({
  computed: mapGetters(['selectedDoc', 'userInfo'])
})
export default class Doc extends Vue {
  async asyncData({ params, store, redirect }: any) {
    const doc = await getDocDetail({ docId: params.id, isPublished: true })

    if (doc.respCode === 0) {
      return redirect('/404')
    }

    let res = { datas: [] }
    if (doc.datas.type !== 'tfNews') {
      res = await getDocTree({ collectionId: doc.datas.collection.id, isPublished: true })
    }
    return {
      doc: doc.datas,
      docTree: res.datas
    }
  }

  userInfo
  selectedDoc
  doc: any = {}
  docTree = []

  get show() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return false
      case 'sm':
        return false
      case 'md':
        return false
      default:
        return true
    }
  }

  toEdit() {
    this.$store.commit('SET_DOC', this.doc)
    this.$router.push('/docs')
  }

  get isOwner() {
    if (this.userInfo.loggedIn) {
      if (this.userInfo.id === this.doc.userId) {
        return true
      }
    }

    return false
  }

  head() {
    return {
      title: this.doc.title + '-思趣网',
      meta: [
        {
          hid: 'og:description',
          name: 'description',
          content: this.doc.alias
        },
        { hid: 'description', name: 'description', content: this.doc.alias }
      ],
      link: [{ rel: 'stylesheet', href: 'https://cdn.siques.cn/libs/css/gitalk.css' }],
      script: [{ src: 'https://cdn.siques.cn/libs/js/gitalk.min.js' }]
    }
  }

  loading = false

  async selectDoc(id) {
    const loading = this.$loading({ text: '努力加载中', status: this.loading })
    const res = await getDocDetail({ docId: id, isPublished: true })
    this.doc = res.datas
    window.scrollTo(0, 0)
    this.renderPage()
    loading.close()
  }

  beforeMount() {
    this.renderPage()
  }

  renderPage() {
    this.$nextTick(() => {
      gitTalk(this.doc.title, 'www.siques.cn/doc/' + this.doc.id)
      hljs()
      copy(this)
      tocjs()
      fancybox()
    })
  }
  // TS中的计算属性
}
</script>

<style lang="scss">
.v-avatar > img {
  border-radius: 50%;
}

.doc-blur .v-image__inner {
  filter: blur(5px);
}
</style>
