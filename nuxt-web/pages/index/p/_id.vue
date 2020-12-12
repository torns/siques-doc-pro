<template>
  <div>
    <div>
      <div
        class="absolute d-flex jc-center flex-column ai-center "
        style="z-index:5!important; width: 80%;top: 3.3%;left:10%;"
      >
        <div class="fs-md"></div>
        <h1 style="text-align: center;">
          <div class="text-white py-2 ellipsis-2 lh-5">{{ post.title }}</div>
        </h1>
        <div class="d-flex py-1 ai-center">
          <div class="d-flex fs-xs ai-center pt-1 text-light-1">
            <div class="pr-2">
              <i class="el-icon-time"></i>
              {{ $dayjs(post.created).format('YYYY.MM.DD HH:MM:ss') }}
            </div>

            <div><i class="el-icon-view pr-1"></i>{{ post.views }}</div>
          </div>
        </div>
        <div class="tag d-flex ai-baseline mb-3">
          <div class="text-light-1 fs-xs">阅读约 {{ Math.ceil(post.counts / 275) }} 分钟</div>
        </div>
      </div>

      <div class="postMask" style="height:32vh;"></div>

      <div class="post-blur">
        <div class=" relative ">
          <el-image :src="post.cover" fit="cover" style="height:32vh;" class="w-100"> </el-image>
        </div>
      </div>
      <div class="post_container  pb-3">
        <el-row :gutter="0" type="flex">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <article id="article" class=" bg-white ">
              <div>
                <div v-if="post.title" style="padding: 1.5rem;">
                  <div
                    class="d-flex flex-column menu-button"
                    style="position:absolute;top: 0%;left: 0;
    "
                  ></div>

                  <!-- 滚动监听区域 -->
                  <div id="post-content" v-scroll-spy v-html="post.body" v-highlight class="article "></div>
                  <div class="text-primary mt-3 fs-xs">
                    阅读：{{ post.views > 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views }}
                    <span>.</span>
                    <span class="pr-2">字数：{{ post.counts }}</span>
                    {{ '发布于 ' + $dayjs(post.created).fromNow() }}
                  </div>
                </div>
              </div>
            </article>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- <sq-navigation :data="recommendPost" class="my-4"></sq-navigation> -->

    <sq-sidemenu>
      <sq-toc :title="post.title" :collectionPosts="collectionPosts"></sq-toc>
    </sq-sidemenu>
    <sq-footer></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import mediumZoom from 'medium-zoom'

import { hljs } from '../../../plugins/utils.js'
import md from '../../../plugins/markdown.js'
import tocjs from '~/plugins/toc.js'
import scrolldown from '~/components/Base/BaseScrollDown/index.vue'

import toc from '~/components/Toc/PostToc.vue'

import sideMenu from '~/components/Page/Post/NaviSideMenu.vue'
// import SearchButton from '~/components/Page/Post/ButtonSearchAny.vue'
import { getDocDetail } from '@/api/doc'
const mediumzoom = () => {
  mediumZoom(document.querySelectorAll('p img'))
}

@Component({
  components: {
    'sq-sidemenu': sideMenu,
    'sq-toc': toc,
    'sq-down': scrolldown

    // 'sq-navigation': PostNavigation
  }
})
export default class Post extends Vue {
  async asyncData({ params, store, redirect }: any) {
    console.log(params)
    const res = await getDocDetail({ docId: params.id })

    console.log(res)
    if (res.respCode === 0) {
      redirect('/error')
    }

    res.datas.body = md.render(res.datas.body)

    return {
      post: res.datas
      // recommendPost: res1.data[0],
      // collectionPosts: res2.data.posts
    }
  }
  collectionPosts = []
  recommendPost = []
  head() {
    return {
      title: this.post.title + '-思趣网',
      meta: [
        {
          hid: 'og:description',
          name: 'description',
          content: this.post.alias
        },
        { hid: 'description', name: 'description', content: this.post.alias }
      ]
    }
  }

  post: any = ''

  fetchedComment = ''
  dialogFormVisible = false

  name = ''
  type = 'comment'

  beforeMount() {
    this.initPost()
  }
  // TS中的计算属性

  get id(): any {
    return this.$route.params.id
  }

  get isUser(): any {
    return !this.$store.state.UserNotExist
  }

  get isowner() {
    try {
      return this.$store.state.auth.user.id === this.post.user.id
    } catch {
      return false
    }
  }

  initPost() {
    this.$nextTick(() => {
      hljs()
      tocjs()
      mediumzoom()
    })
  }
}
</script>

<style lang="scss">
.menu-button {
  @media (max-width: 1200px) {
    display: none;
  }
}

.menu-button {
  position: fixed;
  margin-left: -6em;
  margin-top: 10em;
}

.el-avatar > img {
  border-radius: 50%;
}

.post-blur .el-image__inner {
  filter: blur(5px);
}
</style>
