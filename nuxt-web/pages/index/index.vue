<template>
  <div
    v-infinite-scroll="load"
    class="infinite-list "
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance="0"
  >
    <div v-if="$store.state.showBanner" class="bg-primary">
      <div class="container ">
        <el-row :gutter="0" class="d-flex">
          <el-col
            :xs="0"
            :sm="4"
            :md="5"
            :lg="4"
            :xl="4"
            class="hidden-sm-and-down "
          >
          </el-col>
          <el-col :xs="0" :sm="24" :md="14" :lg="14" :xl="14">
            <div
              style="height:190px"
              class="bg-primary d-flex jc-around text-white "
            >
              <div class="d-flex flex-column jc-center">
                <div class="fs-xll pb-3">在思趣，学习技能、解决问题</div>
                <div>
                  每个月，我们帮助开发者们解决各种各样的技术问题。并助力他们在技术能力、职业生涯、影响力上获得提升。
                </div>
              </div>
              <div class="d-flex"></div>
            </div>
          </el-col>
          <el-col
            :xs="0"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="6"
            class="hidden-sm-and-down"
          >
            <div class="fs-xm hover-1 text-right text-white pt-2">
              <div @click="toggleBanner" class="point">关闭</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="container" style="min-height: 100vh;">
      <el-row :gutter="0" class="d-flex xm-flex-wrap  pt-4">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class=" ">
          <div class="d-flex " style="flex-direction: row-reverse;">
            <ul
              class="text-left fs-xm  sq-leftside-link text-gray-1 flex-wrap"
              style="
    display: flex;"
            >
              <li
                @click="
                  handleCategory(
                    link.alias,
                    link.sort,
                    link.tag,
                    link.taglist,
                    link.listId
                  )
                "
                v-for="link in links"
                :key="link.alias"
                :class="
                  (link.alias == category ? 'bg-1 ' : 'hover-2 ') +
                    `w-100  pl-3 py-2`
                "
              >
                <i
                  :class="
                    (link.alias == category
                      ? `text-white `
                      : `text-${link.color} `) + `fa pr-1  fa-${link.icon}`
                  "
                ></i>

                {{ link.name }}
              </li>
              <div class="pl-3 py-2 xm ">技术频道</div>
              <li
                @click="
                  handleCategory(link.alias, link.sort, link.tag, link.taglist)
                "
                v-for="link in techChanel"
                :key="link.alias"
                :class="
                  (link.alias == category ? `bg-1 ` : 'hover-2 ') +
                    `w-100  pl-3 py-2 `
                "
              >
                <i
                  :class="
                    (link.alias == category
                      ? `text-white `
                      : `text-${link.color} `) +
                      `fs-md pr-1 iconfont   icon-${link.icon}`
                  "
                ></i>
                {{ link.name }}
              </li>
              <router-link :to="`/tags`" class="w-100 " tag="li">
                <div class="pl-3   py-2 hover-2">
                  <i class="fa fa-tag pr-1"></i>
                  更多标签
                </div>
              </router-link>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="px-2 mx-1">
          <div>
            <div>
              <el-carousel
                ref="carousel"
                @click.native="linkTo"
                height="150px"
                style="border-radius: 5px;"
                class="point"
              >
                <el-carousel-item
                  v-for="(item, index) in carousel"
                  :key="index"
                >
                  <img
                    :src="item.img"
                    class="w-100"
                    style="min-height:150px;object-fit: cover;"
                  />

                  <div class="mask"></div>
                </el-carousel-item>
              </el-carousel>

              <div class="pt-3">为你推荐</div>

              <el-divider></el-divider>

              <ul style="overflow: auto;">
                <div
                  v-for="(post, $index) in posts"
                  :key="$index"
                  class="infinite-list-item pb-3"
                >
                  <div class="d-flex ai-center">
                    <div class=" ">
                      <div>
                        <router-link
                          :to="`/p/${post.id}`"
                          target="_blank"
                          tag="a"
                          class="text-dark-1 hoverlink point   fs-lg"
                          >{{ post.title }}</router-link
                        >
                      </div>
                      <div>
                        <el-tag
                          v-for="tag in post.tags"
                          :key="tag.id"
                          effect="plain"
                          size="mini"
                          type="primary"
                          class="mt-2 mr-2 hover-4 hover-2 point "
                        >
                          <router-link :to="`/t/${tag.id}`">{{
                            tag.name
                          }}</router-link>
                        </el-tag>
                      </div>
                      <div>
                        <div class="text-gray fs-xm lh-2 pt-2">
                          <!-- 过滤 -->
                          <span>{{ post.alias }}...</span>
                        </div>
                      </div>

                      <div class="d-flex mb-4 pt-2 ai-center fs-xm">
                        <div class="d-flex point ai-center">
                          <i
                            class="fs-xl el-icon-success hover-1  text-primary"
                          ></i>

                          <div class="pl-1 pr-3 ">
                            <div>
                              <span class="text-primary hoverlink font-bold"
                                >× {{ post.liked }}
                              </span>
                              <span>· 赞</span>
                            </div>
                          </div>
                        </div>
                        <nuxt-link :to="`u/${post.user.id}`" tag="div"
                          ><div class="pr-2 point hoverlink text-gray-1">
                            {{ post.user.name }} ·
                          </div>
                        </nuxt-link>

                        <div>
                          <i class="fa fa-calendar-check-o text-blue"></i>
                          {{
                            $dayjs(post.created).format(
                              'YYYY年MM月DD日 HH:MM:ss'
                            )
                          }}
                        </div>
                      </div>
                    </div>
                    <div v-if="post.cover" class="xs pl-3 pr-2 my-1 point">
                      <router-link :to="`/p/${post.id}`">
                        <el-image
                          :src="post.cover"
                          style="width: 140px; height: 90px"
                          class="border-radius shadow-1 border-dash"
                          fit="contain"
                        ></el-image
                      ></router-link>
                    </div>
                  </div>
                </div>
                <div v-if="loading" class="my-3 text-primary fs-xl">
                  <i class="el-icon-loading"></i> Loading
                </div>
                <div v-if="noMore" class="my-3 text-primary fs-sm">
                  (ﾟ∀ﾟ )没有更多内容了
                </div>
              </ul>
            </div>
          </div>
        </el-col>

        <el-col
          :xs="0"
          :sm="6"
          :md="6"
          :lg="6"
          :xl="6"
          class="hidden-sm-and-down"
        >
          <sq-indexBar
            :hotTags="hotTags"
            :hotComments="hotComments"
          ></sq-indexBar>
        </el-col>
      </el-row>
    </div>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { listIntercep } from '../../plugins/utils.js'
import indexSideBar from '~/components/SideBar/indexSideBar.vue'
@Component({
  components: {
    'sq-indexBar': indexSideBar
  }
})
export default class MyPage extends Vue {
  async asyncData() {
    // 在 @component 中不可以写 this.$http //
    const http = Vue.prototype.$http
    const res = await http.get('/posts/all?limit=10&page=1&type=post')
    const res1 = await http.get('tags/1/hot')
    const res2 = await http.get('comments')
    return {
      posts: res.data[0],
      maxcount: res.data[1],
      hotTags: res1.data,
      hotComments: res2.data
    }
  }
  page = 1
  count = 10
  maxcount: number = 0
  loading = false
  sort = 'liked'
  tag = null
  taglist = null
  showBanner = true
  posts = []
  carousel = [
    {
      img:
        'https://shuxie.oss-cn-hangzhou.aliyuncs.com/%E6%B7%B1%E5%A4%9C%E3%81%AE%E4%BB%A3%E7%A0%81.png',
      link: '/blogs'
    },
    {
      img:
        'https://shuxie.oss-cn-hangzhou.aliyuncs.com/%E9%BB%91%E8%89%B2%E5%9C%B0%E7%90%83LinkedIn%20Banner.png',
      link: '/blogs'
    }
  ]
  category: string = 'hot'
  // 轮播图跳转
  linkTo() {
    const ref: any = this.$refs.carousel
    const activeIndex = ref.activeIndex
    this.$router.push(this.carousel[activeIndex].link)
  }

  get noMore(): any {
    return this.count >= this.maxcount
  }

  get disabled(): any {
    return this.loading || this.noMore
  }

  get taglists(): any {
    try {
      return this.$store.state.auth.user.tags || ''
    } catch {
      return null
    }
  }

  links = [
    {
      name: '近期热门',
      alias: 'hot',
      sort: 'liked',
      icon: 'thumbs-up',
      color: 'dark'
    },
    {
      name: '我的订阅',
      taglist: this.taglists,
      listId: true,
      sort: 'liked',
      icon: 'address-card',
      color: 'dark'
    },
    {
      name: '最近更新',
      alias: 'new',
      sort: 'created',
      icon: 'compass',
      color: 'dark'
    }
  ]

  techChanel = [
    {
      name: '前端',
      alias: 'frontEnd',
      taglist: ['frontEnd'],
      sort: 'created',
      icon: 'js',
      color: 'yellow-1'
    },
    {
      name: '后端',
      alias: 'backEnd',
      taglist: ['cloudcomputing', 'database', 'server'],
      sort: 'created',
      icon: 'storage',
      color: 'blue-1'
    },
    {
      name: '工具',
      alias: 'tools',
      taglist: ['tools'],
      sort: 'created',
      icon: 'tools',
      color: 'blue'
    },
    {
      name: 'Node',
      alias: 'node',
      tag: 'node.js',
      sort: 'created',
      icon: 'node-js',
      color: 'blue'
    },
    {
      name: 'Vue',
      alias: 'vue',
      tag: 'vue.js',
      sort: 'created',
      icon: 'vuejs',
      color: 'green'
    },
    {
      name: '小程序',
      alias: 'miniProgram',
      taglist: ['miniProgram'],
      sort: 'created',
      icon: 'xiaochengxu',
      color: 'green'
    },
    {
      name: 'Nuxt',
      alias: 'nuxtjs',
      tag: 'nuxtjs',
      sort: 'created',
      icon: 'nuxt-dot-js',
      color: 'green'
    },
    {
      name: 'Nest',
      alias: 'nestjs',
      tag: 'nestjs',
      sort: 'created',
      icon: 'file_type_nestjs',
      color: 'red'
    },
    {
      name: '行业',
      alias: 'info',
      tag: 'info',
      sort: 'created',
      icon: 'hangye',
      color: 'yellow'
    }
  ]

  mounted() {}

  load() {
    this.loading = true
    this.page += 1
    let list = ''
    list = listIntercep(this.taglist)

    const link =
      `/posts/all?limit=10&page=${this.page}&sort=${this.sort}` +
      (this.tag ? `&tags=${this.tag}` : '') +
      (this.taglist ? `&taglist=${list}` : '') +
      `&type=post`
    setTimeout(async () => {
      const res = await this.$http.get(link)
      this.posts = this.posts.concat(res.data[0])
      this.count += res.data[0].length
      this.loading = false
    }, 500)
  }

  async handleCategory(
    alias: any,
    sort: any,
    tag: any,
    taglist: any,
    listId: any
  ) {
    // console.log(
    //   { 别称: alias },
    //   { 标签: tag },
    //   { 分类: sort },
    //   { 标签列: taglist }
    // )
    this.category = alias
    this.tag = tag
    this.taglist = taglist
    this.sort = sort
    this.page = 1
    this.count = 10
    let list = ''
    list = listIntercep(this.taglist)

    // console.log(list)
    const link =
      `/posts/all?limit=10&page=${this.page}` +
      (sort ? `&sort=${sort}` : '') +
      (tag ? `&tags=${tag}` : '') +
      (taglist ? `&taglist=${list}` : '') +
      (listId ? `&listId=${listId}` : '') +
      `&type=post`
    const res = await this.$http.get(link)
    this.maxcount = res.data[1]
    this.posts = res.data[0]
  }

  toggleBanner() {
    this.$store.commit('toggleBanner')
  }
}
</script>

<style lang="scss">
.el-divider--vertical {
  height: inherit;
}

.el-divider--horizontal {
  margin: 15px 0;
}

.mask {
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.7));
  border-radius: 4px;
}
.tech-square-title::after {
  position: absolute;
  content: '';
  border-bottom: 1px solid #eee;
  width: 95px;
  margin-left: 5px;
  margin-top: 8px;
}
</style>
