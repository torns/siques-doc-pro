<template>
  <div
    v-infinite-scroll="load"
    class="infinite-list home"
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
                  每个月，我们帮助 1000
                  万的开发者解决各种各样的技术问题。并助力他们在技术能力、职业生涯、影响力上获得提升。
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
      <el-row :gutter="0" class="d-flex flex-wrap  pt-4">
        <el-col :xs="24" :sm="24" :md="5" :lg="4" :xl="4">
          <div class="d-flex " style="flex-direction: row-reverse;">
            <ul
              class="text-left fs-xm sq-leftside-link text-gray-1"
              style="flex-wrap: wrap;
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
                    `pr-6  pl-3 py-2`
                "
              >
                <!-- <font-awesome-icon
                  :icon="[link.prefix, link.icon]"
                  :class="` pr-1 text-${link.color}`"
                /> -->
                <i
                  :class="
                    (link.alias == category
                      ? `text-white `
                      : `text-${link.color} `) + `fa pr-1  fa-${link.icon}`
                  "
                ></i>

                {{ link.name }}
              </li>
              <div class="pl-3 py-2 md">技术频道</div>
              <li
                @click="
                  handleCategory(link.alias, link.sort, link.tag, link.taglist)
                "
                v-for="link in techChanel"
                :key="link.alias"
                :class="
                  (link.alias == category ? `bg-1 ` : 'hover-2 ') +
                    `pr-7  pl-3 py-2 `
                "
              >
                <i
                  :class="
                    (link.alias == category
                      ? `text-white `
                      : `text-${link.color} `) +
                      `fs-md iconfont  pr-1  icon-${link.icon}`
                  "
                ></i>
                {{ link.name }}
              </li>
              <router-link :to="`/tags`" tag="li">
                <div class="pl-3 pr-6 py-2 hover-2">
                  <i class="fa fa-tag pr-1"></i>
                  更多标签
                </div>
              </router-link>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="px-2">
          <div>
            <div>
              <el-carousel
                height="150px"
                style="border-radius: 5px;"
                direction="vertical"
              >
                <el-carousel-item v-for="item in 4" :key="item">
                  <div
                    style="background: url(https://image-static.segmentfault.com/299/579/2995795553-5e0acc638a96c);background-size: cover;height:150px"
                    class="w-100"
                  ></div>
                  <div class="mask"></div>
                </el-carousel-item>
              </el-carousel>

              <div class="pt-3">为你推荐</div>

              <el-divider></el-divider>

              <ul style="overflow: auto;">
                <li
                  v-for="(post, $index) in posts"
                  :key="$index"
                  class="infinite-list-item"
                >
                  <router-link
                    :to="`/p/${post.id}`"
                    target="_blank"
                    tag="a"
                    class="text-dark-1 hoverlink point  fs-lg"
                    >{{ post.title }}</router-link
                  >
                  <div class="text-gray fs-xm lh-2">
                    <!-- 过滤 -->
                    <span>{{ post.alias | capitalize }}...</span>
                    <div class="d-flex mb-3">
                      <div class="d-flex point ai-baseline">
                        <i class="el-icon-success hover-1 lh-2"></i>

                        <div class="pl-1 pr-3 text-primary hoverlink">
                          ×{{ post.liked }} · 赞
                        </div>
                      </div>
                      <nuxt-link :to="`u/${post.user.id}`" tag="div"
                        ><div class="pr-2">
                          {{ post.user.name }} ·
                        </div></nuxt-link
                      >

                      <div>{{ $dayjs(post.created).format('MM月DD日') }}</div>
                      <div>{{ post.category }}</div>
                    </div>
                  </div>
                </li>
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
          :md="5"
          :lg="6"
          :xl="6"
          class="hidden-sm-and-down"
        >
          <div class="pl-3" style="min-width:200px;max-width:240px;">
            <div class="bg-info border-1">
              <div
                style="height:50px;margin:0 auto;"
                class="notice text-black fs-sm"
              >
                <div class="fs-xxs" style="padding: 16px 10px;">
                  抒写年度有奖征文丨一起来总结你的 2019
                </div>
              </div>
            </div>
            <div class="pt-3 d-flex jc-between">
              <div>文章推荐</div>
              <div class="text-primary">更多</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <sq-footer :topBorder="true"></sq-footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { listIntercep } from '../../plugins/utils.js'
@Component({
  components: {}
})
export default class MyPage extends Vue {
  page = 1
  count = 10
  maxcount: number = 0
  loading = false
  sort = 'liked'
  tag = null
  taglist = null
  showBanner = true
  posts = []
  category: string = 'hot'

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
      name: '最新内容',
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
      name: '行业',
      alias: 'info',
      tag: 'info',
      sort: 'created',
      icon: 'hangye',
      color: 'yellow'
    }
  ]

  mounted() {
    this.fetchPost()
  }
  async fetchPost() {
    const res = await this.$http.get('/posts/all?limit=10&page=1&type=post')
    this.posts = res.data[0]
    this.maxcount = res.data[1]
  }

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
